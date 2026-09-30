import { execSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const mainSiteRoot = resolve(scriptDir, "..");
const catalogDir = join(mainSiteRoot, "public/landing-catalog");
const bootcampAssetsDir = join(catalogDir, "bootcamps");
const programAssetsDir = join(catalogDir, "programs");
const illustrationAssetsDir = join(catalogDir, "illustrations");

function bundleMainSiteEntry(entryFileName, buildEntrySource) {
  const tempDir = mkdtempSync(join(mainSiteRoot, ".landing-catalog-export-"));
  const entryPath = join(tempDir, entryFileName);
  const entrySource = buildEntrySource((relativeMainSiteModulePath) =>
    relative(tempDir, join(mainSiteRoot, relativeMainSiteModulePath)).replace(/\\/g, "/"),
  );

  writeFileSync(entryPath, entrySource, "utf8");

  const outfile = join(tempDir, "bundle.mjs");
  const mainSiteAlias = join(mainSiteRoot, "src").replace(/\\/g, "/");

  execSync(
    [
      "npx",
      "esbuild",
      JSON.stringify(entryPath),
      "--bundle",
      "--format=esm",
      "--platform=node",
      `--alias:@=${mainSiteAlias}`,
      "--loader:.webp=file",
      "--loader:.svg=file",
      "--loader:.png=file",
      "--loader:.jpg=file",
      "--loader:.jpeg=file",
      `--outfile=${JSON.stringify(outfile)}`,
    ].join(" "),
    { cwd: mainSiteRoot, stdio: "pipe" },
  );

  return { tempDir, outfile };
}

function bundleMainSiteModule(relativeMainSiteModulePath, entryFileName) {
  return bundleMainSiteEntry(entryFileName, (resolveMainSiteModulePath) => {
    const mainSiteModulePath = resolveMainSiteModulePath(relativeMainSiteModulePath);

    if (relativeMainSiteModulePath.endsWith("bootcampData.ts")) {
      return `export { bootcamps } from "${mainSiteModulePath}";`;
    }

    return `import { courses } from "${mainSiteModulePath}";
export const programImages = courses.map((course) => ({
  slug: course.slug,
  image: course.image,
}));`;
  });
}

async function loadBundledModule(outfile) {
  const moduleUrl = new URL(`file:///${outfile.replace(/\\/g, "/")}`).href;
  return import(moduleUrl);
}

function copyBundledAsset(assetPath, bundleOutfile, destinationDir, preferredName) {
  const bundleDir = dirname(bundleOutfile);
  const sourcePath = resolve(bundleDir, assetPath);

  if (!existsSync(sourcePath)) {
    throw new Error(`Missing catalog asset: ${sourcePath}`);
  }

  mkdirSync(destinationDir, { recursive: true });
  const destinationPath = join(destinationDir, preferredName);
  copyFileSync(sourcePath, destinationPath);
  return `/landing-catalog/${relative(catalogDir, destinationPath).replace(/\\/g, "/")}`;
}

function syncIllustrations() {
  const illustrations = [
    {
      source: join(mainSiteRoot, "src/assets/img/ProgramPageImage/elitbootcamp.svg"),
      target: join(illustrationAssetsDir, "elitbootcamp.svg"),
      exportName: "eliteBootcampIllustration",
    },
    {
      source: join(mainSiteRoot, "src/assets/img/ProgramPageImage/flagshipProgram.svg"),
      target: join(illustrationAssetsDir, "flagshipProgram.svg"),
      exportName: "flagshipProgramIllustration",
    },
  ];

  const paths = {};

  for (const illustration of illustrations) {
    mkdirSync(dirname(illustration.target), { recursive: true });
    copyFileSync(illustration.source, illustration.target);
    paths[illustration.exportName] =
      `/landing-catalog/illustrations/${basename(illustration.target)}`;
  }

  return paths;
}

async function main() {
  mkdirSync(catalogDir, { recursive: true });

  const bootcampBundle = bundleMainSiteModule(
    "src/config/constants/bootcampData.ts",
    "bootcamp-entry.ts",
  );

  const programImagesBundle = bundleMainSiteModule(
    "src/config/constants/programData.ts",
    "program-images-entry.ts",
  );

  const webinarBundle = bundleMainSiteEntry("webinar-entry.ts", (resolveMainSiteModulePath) => {
    const webinarSchedulePath = resolveMainSiteModulePath("src/config/data/webinar-schedule.ts");

    return `import {
  upcomingWebinars,
  webinarScheduleContent,
  defaultWebinarSpeakers,
  backgroundOptions,
  webinarWhatsappNumber,
} from "${webinarSchedulePath}";

export {
  upcomingWebinars,
  webinarScheduleContent,
  defaultWebinarSpeakers,
  backgroundOptions,
  webinarWhatsappNumber,
};`;
  });

  const bootcampModule = await loadBundledModule(bootcampBundle.outfile);
  const programImagesModule = await loadBundledModule(programImagesBundle.outfile);
  const webinarModule = await loadBundledModule(webinarBundle.outfile);

  const flagshipJson = execSync(
    `npx tsx -e "import { flagshipProgramCards } from './src/config/constants/flagshipProgramData.ts'; console.log(JSON.stringify(flagshipProgramCards));"`,
    { cwd: mainSiteRoot, encoding: "utf8" },
  ).trim();

  const flagshipProgramCards = JSON.parse(flagshipJson);

  const bootcamps = bootcampModule.bootcamps.map((bootcamp) => {
    const extension = bootcamp.image.split(".").pop() || "webp";
    const preferredName = `${bootcamp.slug}.${extension}`;
    const publicPath = copyBundledAsset(
      bootcamp.image,
      bootcampBundle.outfile,
      bootcampAssetsDir,
      preferredName,
    );

    return {
      id: bootcamp.id,
      slug: bootcamp.slug,
      title: bootcamp.title,
      duration: bootcamp.duration,
      date: bootcamp.date,
      language: bootcamp.language,
      originalPrice: bootcamp.originalPrice,
      launchPrice: bootcamp.launchPrice,
      currency: bootcamp.currency,
      description: bootcamp.description,
      image: publicPath,
      ...(bootcamp.phase ? { phase: bootcamp.phase } : {}),
      ...(bootcamp.launchNote ? { launchNote: bootcamp.launchNote } : {}),
    };
  });

  const flagshipProgramImages = programImagesModule.programImages.map((program) => {
    const extension = program.image.split(".").pop() || "webp";
    const preferredName = `${program.slug}.${extension}`;
    const publicPath = copyBundledAsset(
      program.image,
      programImagesBundle.outfile,
      programAssetsDir,
      preferredName,
    );

    return {
      slug: program.slug,
      image: publicPath,
    };
  });

  const illustrations = syncIllustrations();

  writeFileSync(
    join(catalogDir, "catalog.json"),
    JSON.stringify(
      {
        bootcamps,
        flagshipProgramCards,
        flagshipProgramImages,
        eliteBootcampIllustration: illustrations.eliteBootcampIllustration,
        flagshipProgramIllustration: illustrations.flagshipProgramIllustration,
      },
      null,
      2,
    ),
    "utf8",
  );

  writeFileSync(
    join(catalogDir, "webinar-schedule.json"),
    JSON.stringify(
      {
        upcomingWebinars: webinarModule.upcomingWebinars,
        webinarScheduleContent: webinarModule.webinarScheduleContent,
        defaultWebinarSpeakers: webinarModule.defaultWebinarSpeakers,
        backgroundOptions: webinarModule.backgroundOptions,
        webinarWhatsappNumber: webinarModule.webinarWhatsappNumber,
      },
      null,
      2,
    ),
    "utf8",
  );

  rmSync(bootcampBundle.tempDir, { recursive: true, force: true });
  rmSync(programImagesBundle.tempDir, { recursive: true, force: true });
  rmSync(webinarBundle.tempDir, { recursive: true, force: true });

  console.log(
    `Exported landing catalog: ${bootcamps.length} bootcamps, ${flagshipProgramCards.length} programs, ${webinarModule.upcomingWebinars.length} webinars → public/landing-catalog/`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
