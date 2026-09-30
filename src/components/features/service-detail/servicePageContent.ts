import type { Service } from "@/config/data/services";

export type ServicePoint = { title: string; body: string };
export type ServiceFaq = { question: string; answer: string };

export type ServicePageContent = {
  heroTitle: string;
  heroBody: string;
  heroCards: ServicePoint[];
  detailsTitle: string;
  detailsLead: string;
  detailsBody: string;
  detailsPoints: ServicePoint[];
  differentTitle: string;
  differentLead: string;
  differentPoints: ServicePoint[];
  benefitsTitle: string;
  benefitsLead: string;
  benefits: string[];
  paymentLead: string;
  paymentBody: string;
  paymentCovers: string[];
  faqs: ServiceFaq[];
};

export const servicePageContent: Record<Service["slug"], ServicePageContent> = {
  "business-consultancy": {
    heroTitle: "A plan and a recommendation, not a task list",
    heroBody:
      "Business consultancy is for a decision that needs structure: how the work should be planned, where operations are getting stuck, and what to change before the rest of the business keeps moving.",
    heroCards: [
      {
        title: "Business planning",
        body: "The sequence of work and the decisions that have to be made before operations continue.",
      },
      {
        title: "Operational guidance",
        body: "How the day-to-day work should run, written so someone else can follow it.",
      },
      {
        title: "A finished recommendation",
        body: "Advice that ends in a note you can keep, not an open conversation.",
      },
    ],
    detailsTitle: "What a consultation covers",
    detailsLead: "Advisory work, agreed before it starts.",
    detailsBody:
      "We look at the business as you describe it, then write the plan, the guidance, or the process change you asked for. The result is a recommendation. It is not a month of data entry, a set of filed documents, or someone answering the customer inbox.",
    detailsPoints: [
      {
        title: "Business planning",
        body: "Goals, the order of the work, and the choices that should be settled before other services begin.",
      },
      {
        title: "Operational guidance",
        body: "How handoffs, routines, and responsibilities should work, based on the operation you already have.",
      },
      {
        title: "Process improvement",
        body: "The current steps, where they stall, and a revised way to run them.",
      },
      {
        title: "Business advisory support",
        body: "A direct recommendation when one decision needs a structured answer.",
      },
    ],
    differentTitle: "How consultancy is different",
    differentLead: "The other services do the work. This one decides how that work should be shaped.",
    differentPoints: [
      {
        title: "Not the monthly desk",
        body: "Administrative support keeps records and data entry moving through the month. A consultation ends when the plan or the recommendation is delivered.",
      },
      {
        title: "Not document production",
        body: "Documentation services prepare, digitize, and file the papers. Consultancy can say which documents you need. It does not produce the file set.",
      },
      {
        title: "Not the project board",
        body: "Project support tracks tasks and milestones. Consultancy sets the direction. It does not run the schedule.",
      },
      {
        title: "Not invoices or the customer inbox",
        body: "Billing prepares invoices. Customer support answers enquiries. A consultation can note that you need either one. It does not send the invoice or the reply.",
      },
    ],
    benefitsTitle: "What you leave with",
    benefitsLead: "The value is a decision you can act on, written down.",
    benefits: [
      "A plan the people doing the work can follow",
      "Guidance that names the process, rather than a general opinion",
      "Process changes you can see, not a list of intentions",
      "A written recommendation, so the next conversation starts from the same place",
    ],
    paymentLead: "This service is paid as a consultation fee.",
    paymentBody:
      "The fee is for the advisory scope you agreed: the planning, the guidance, the process notes, and the written recommendation. It is not a monthly service fee, a document processing fee, a project milestone, an invoice management fee, or a contracted support fee.",
    paymentCovers: [
      "The consultation scope that was agreed",
      "The plan, guidance, or process notes inside that scope",
      "A written note of the recommendation",
    ],
    faqs: [
      {
        question: "Is consultancy an ongoing monthly service?",
        answer:
          "No. It is a defined consultation. If you need records and data entry kept up through the month, that is administrative support, paid as a monthly service fee.",
      },
      {
        question: "Will the consultation prepare our documents?",
        answer:
          "No. The consultation can say which documents the business needs. Preparing, digitizing, and filing them is documentation services, paid as a document processing fee.",
      },
      {
        question: "Do you run the project after the plan is written?",
        answer:
          "Not under this service. Coordinating tasks and reporting progress is project and operational support, paid as a project milestone payment.",
      },
      {
        question: "When does the consultation start?",
        answer:
          "After the scope and the consultation fee are agreed. Reading this page does not start the advice.",
      },
      {
        question: "What do we receive at the end?",
        answer:
          "The plan, the operational guidance, or the process recommendation that was agreed, in writing, plus a note of what the consultation covered.",
      },
      {
        question: "Can the advice mention billing or customer replies?",
        answer:
          "Yes, as a recommendation. Sending invoices is billing and invoice management. Answering customers is customer and business support. Those stay separate services.",
      },
    ],
  },
  "administrative-support": {
    heroTitle: "The back office, kept current through the month",
    heroBody:
      "Administrative support is the recurring desk work: records that have to stay up to date, data that has to be entered, and the ordinary administration that piles up if nobody owns it.",
    heroCards: [
      {
        title: "Back-office assistance",
        body: "The routine office work that has to happen every week, not once in a plan.",
      },
      {
        title: "Records and data entry",
        body: "Files and entries kept current, instead of caught up in a rush later.",
      },
      {
        title: "A monthly rhythm",
        body: "The work is agreed as a month of administration, then reviewed.",
      },
    ],
    detailsTitle: "What the month of support covers",
    detailsLead: "Day-to-day administration, not a one-time recommendation.",
    detailsBody:
      "We take the back-office tasks you named and keep them moving for the agreed month. That means records, data entry, and ordinary administration. It does not replace a business plan, a document production job, or the customer inbox.",
    detailsPoints: [
      {
        title: "Back-office assistance",
        body: "The repeating office tasks you listed: chasing internal updates, keeping lists current, and clearing the admin that blocks the week.",
      },
      {
        title: "Record management",
        body: "Business records filed where they belong and updated when something changes.",
      },
      {
        title: "Data entry",
        body: "Information entered from the sources you provide, checked against the fields you specified.",
      },
      {
        title: "Day-to-day business administration",
        body: "The ordinary coordination that keeps the office usable from one week to the next.",
      },
    ],
    differentTitle: "How administrative support is different",
    differentLead: "This is the standing desk. The other services are a decision, a file, a project, an invoice, or a customer reply.",
    differentPoints: [
      {
        title: "Not a consultation",
        body: "Business consultancy writes a plan or a recommendation and then stops. Administration continues through the month you agreed.",
      },
      {
        title: "Not a document job",
        body: "Documentation services prepare and digitize a set of documents. Administration keeps the everyday records moving. It is not a one-off processing batch.",
      },
      {
        title: "Not a project milestone",
        body: "Project support is tied to tasks and a milestone. Administration is tied to the month, even when there is no project deadline.",
      },
      {
        title: "Not invoices or customer replies",
        body: "Preparing invoices is billing. Answering customers is customer support. Administration can keep the internal record of either one. It does not issue the invoice or send the reply.",
      },
    ],
    benefitsTitle: "What the month gives you",
    benefitsLead: "The office stays usable because the routine work has an owner.",
    benefits: [
      "Records that are current at the end of the month, not reconstructed later",
      "Data entry done against the fields you specified",
      "A visible list of the administration that was completed",
      "A month you can renew, change, or stop when the scope changes",
    ],
    paymentLead: "This service is paid as a monthly service fee.",
    paymentBody:
      "The fee is for the month of back-office work that was agreed. It is not a consultation fee, a document processing fee, a project milestone payment, an invoice management fee, or a contracted support fee.",
    paymentCovers: [
      "The back-office tasks named for that month",
      "Record updates and data entry inside that scope",
      "A note of what administration was completed",
    ],
    faqs: [
      {
        question: "Is this a one-time clean-up?",
        answer:
          "The service is a month of ongoing administration. A one-time plan or recommendation is business consultancy. A one-time batch of documents is documentation services.",
      },
      {
        question: "Does the monthly fee include invoices?",
        answer:
          "No. Invoice preparation, payment tracking, and billing records are billing and invoice management, paid as an invoice management fee.",
      },
      {
        question: "Will you answer customer emails under this fee?",
        answer:
          "No. Customer enquiries and client coordination are customer and business support, paid as a contracted support fee. Administration can file the internal record if that was agreed.",
      },
      {
        question: "What do you need from us each month?",
        answer:
          "The records, source files, and the list of admin tasks that belong in the scope. Work outside that list is not treated as included.",
      },
      {
        question: "When does the month start?",
        answer:
          "After the scope and the monthly service fee are agreed. Opening this page does not start the desk work.",
      },
      {
        question: "Can the scope change next month?",
        answer:
          "Yes. The next month is agreed again. A project with milestones, if one appears, belongs under project and operational support.",
      },
    ],
  },
  "documentation-services": {
    heroTitle: "Documents prepared, digitized, and easy to find",
    heroBody:
      "Documentation services are for a set of business papers: preparing them, turning paper or loose files into usable records, organizing what you already have, and helping with the report that has to be assembled from them.",
    heroCards: [
      {
        title: "Preparation",
        body: "Documents drafted or assembled from the material you provide.",
      },
      {
        title: "Digitization",
        body: "Paper and loose files turned into records you can search.",
      },
      {
        title: "A file you can retrieve",
        body: "Organized records, plus reporting help when the document set needs a summary.",
      },
    ],
    detailsTitle: "What the document work includes",
    detailsLead: "A defined set of documents, processed once the scope is clear.",
    detailsBody:
      "We take the documents you named and prepare, digitize, organize, or report on them. The result is the file set, not a business plan, not a month of general admin, and not the invoice run.",
    detailsPoints: [
      {
        title: "Business document preparation",
        body: "Drafts and assembled documents built from the source material and the outline you agreed.",
      },
      {
        title: "Document digitization",
        body: "Physical or scattered files captured so they can be stored and found again.",
      },
      {
        title: "Record organization",
        body: "The set arranged so a person can retrieve a document without hunting through a pile.",
      },
      {
        title: "Reporting assistance",
        body: "A report or summary drawn from the organized documents, when that was part of the scope.",
      },
    ],
    differentTitle: "How documentation is different",
    differentLead: "This service produces and organizes documents. It does not run the office, the project, or the customer conversation.",
    differentPoints: [
      {
        title: "Not everyday administration",
        body: "Administrative support keeps the monthly desk moving. Documentation is a processing job for a named set of documents.",
      },
      {
        title: "Not the business plan",
        body: "Consultancy decides what should change. Documentation prepares the papers. A plan is not a digitized archive.",
      },
      {
        title: "Not the invoice file",
        body: "Invoices, payment tracking, and billing records belong to billing and invoice management. A general business document is not an invoice.",
      },
      {
        title: "Not project coordination",
        body: "Project support tracks tasks and milestones. Documentation can prepare a project report if that document was agreed. It does not manage the project.",
      },
    ],
    benefitsTitle: "What you can do with the file",
    benefitsLead: "The documents stop living in inboxes and stacks.",
    benefits: [
      "A prepared document that matches the outline you agreed",
      "Digitized files instead of a drawer of paper",
      "Records organized so the next person can find them",
      "A report drawn from those records when reporting was part of the scope",
    ],
    paymentLead: "This service is paid as a document processing fee.",
    paymentBody:
      "The fee is for the document set that was agreed: preparation, digitization, organization, or reporting assistance. It is not a consultation fee, a monthly service fee, a project milestone payment, an invoice management fee, or a contracted support fee.",
    paymentCovers: [
      "The documents named in the scope",
      "Digitizing and organizing those documents",
      "Reporting assistance if it was included",
    ],
    faqs: [
      {
        question: "Is every company document included?",
        answer:
          "No. The fee covers the set you named. Adding another batch is a new scope, not an automatic extension.",
      },
      {
        question: "Do you also keep our records updated every week?",
        answer:
          "Not under this fee. Week-to-week record keeping and data entry are administrative support, paid as a monthly service fee.",
      },
      {
        question: "Are invoices part of document processing?",
        answer:
          "No. Invoice preparation and payment tracking are billing and invoice management, paid as an invoice management fee.",
      },
      {
        question: "Can you write the business plan as a document?",
        answer:
          "A plan that comes from advisory work is business consultancy, paid as a consultation fee. This service prepares documents from material you already have.",
      },
      {
        question: "When does processing start?",
        answer:
          "After the document list and the document processing fee are agreed. Sending files alone does not start the work.",
      },
      {
        question: "What do we receive?",
        answer:
          "The prepared, digitized, or organized documents that were agreed, and the report if reporting assistance was in the scope.",
      },
    ],
  },
  "project-operational-support": {
    heroTitle: "A project that reports its own progress",
    heroBody:
      "Project and operational support is for work that has tasks, a sequence, and a point where you need to know what moved. Coordination, task follow-up, operational help on that project, and a progress report.",
    heroCards: [
      {
        title: "Coordination",
        body: "People and tasks pointed at the same project, instead of a general office list.",
      },
      {
        title: "Task follow-up",
        body: "What is open, what is blocked, and what was finished.",
      },
      {
        title: "A milestone you can see",
        body: "Progress reported against the point you agreed to reach.",
      },
    ],
    detailsTitle: "What project support includes",
    detailsLead: "Coordination tied to a project, not to a standing monthly desk.",
    detailsBody:
      "We keep the agreed project moving: who owns the next task, what is blocked, and what should be reported at the milestone. The result is progress you can review. It is not a business plan, a document archive, or the customer inbox.",
    detailsPoints: [
      {
        title: "Project coordination",
        body: "The people, dependencies, and sequence required to reach the milestone you named.",
      },
      {
        title: "Task management",
        body: "Open tasks tracked, owners noted, and blocked work surfaced instead of left in a thread.",
      },
      {
        title: "Operational assistance",
        body: "Hands-on help with the operational steps of this project, inside the scope.",
      },
      {
        title: "Progress reporting",
        body: "A report of what moved, what did not, and what the milestone status is.",
      },
    ],
    differentTitle: "How project support is different",
    differentLead: "Payment and the work both follow a milestone. They do not follow the calendar month or a single piece of advice.",
    differentPoints: [
      {
        title: "Not the monthly admin desk",
        body: "Administrative support continues whether or not a project exists. This service stops and starts with the project and its milestone.",
      },
      {
        title: "Not the plan that comes first",
        body: "Consultancy writes the direction. Project support carries out the coordination after the project is defined.",
      },
      {
        title: "Not a document batch",
        body: "Documentation prepares and files documents. This service can ask for a progress report. It does not digitize an archive.",
      },
      {
        title: "Not billing or customer replies",
        body: "Invoices and customer enquiries stay with those services, even if the project depends on them. They are not bundled into the milestone.",
      },
    ],
    benefitsTitle: "What you can see while the project moves",
    benefitsLead: "The project has a status, not a pile of messages.",
    benefits: [
      "Tasks with an owner, instead of work that lives in a chat",
      "Blocked items named before the milestone date arrives",
      "Operational help limited to the project you agreed",
      "A progress report you can read without reconstructing the week",
    ],
    paymentLead: "This service is paid as a project milestone payment.",
    paymentBody:
      "The payment is attached to the milestone you agreed, not to a month on the calendar and not to a consultation. It is not a consultation fee, a monthly service fee, a document processing fee, an invoice management fee, or a contracted support fee.",
    paymentCovers: [
      "Coordination through the agreed milestone",
      "Task follow-up and operational help inside that project",
      "The progress report for that milestone",
    ],
    faqs: [
      {
        question: "Is this the same as monthly administration?",
        answer:
          "No. Monthly records and data entry are administrative support. This service is tied to a project milestone, and the payment follows that milestone.",
      },
      {
        question: "Do you write the project plan first?",
        answer:
          "A planning and advisory engagement is business consultancy, paid as a consultation fee. This service coordinates a project that already has a scope.",
      },
      {
        question: "What counts as a milestone?",
        answer:
          "The point you agreed: a set of tasks done, a handoff made, or a progress report delivered. The payment is for that point, not for unrelated office work.",
      },
      {
        question: "Will you prepare the project documents?",
        answer:
          "A document set is documentation services, paid as a document processing fee. Progress reporting here is the status of the project, not a digitized archive.",
      },
      {
        question: "When does coordination start?",
        answer:
          "After the project scope and the milestone payment are agreed. Listing tasks on this page does not start the work.",
      },
      {
        question: "What do we receive at the milestone?",
        answer:
          "The coordination and task follow-up that were agreed, the operational help inside the scope, and a progress report of what was completed.",
      },
    ],
  },
  "billing-invoice-management": {
    heroTitle: "Invoices prepared, payments tracked, records kept",
    heroBody:
      "Billing and invoice management is the money paperwork: invoices prepared from the details you provide, payments followed until they are recorded, and the billing file kept in order.",
    heroCards: [
      {
        title: "Invoice preparation",
        body: "Invoices built from the billing details you supply.",
      },
      {
        title: "Payment tracking",
        body: "What was issued, what was paid, and what is still open.",
      },
      {
        title: "A billing record",
        body: "Financial records organized so the next invoice is not a search.",
      },
    ],
    detailsTitle: "What billing support includes",
    detailsLead: "Invoices and payment records, not general filing and not the customer inbox.",
    detailsBody:
      "We prepare the invoices in the scope, track the payments against them, handle the billing administration you named, and keep the financial records that belong with those invoices. A business plan, a project board, and a customer reply are different services.",
    detailsPoints: [
      {
        title: "Invoice preparation",
        body: "Invoices drafted from the amounts, parties, and descriptions you provide.",
      },
      {
        title: "Payment tracking",
        body: "Each invoice marked as issued, paid, or still open, using the updates you share.",
      },
      {
        title: "Billing administration",
        body: "The follow-up steps around those invoices: corrections, reissues, and the admin you agreed.",
      },
      {
        title: "Financial record organization",
        body: "The billing file arranged so an invoice and its payment can be found together.",
      },
    ],
    differentTitle: "How billing is different",
    differentLead: "If it is not an invoice, a payment, or the record of either, it belongs to another service.",
    differentPoints: [
      {
        title: "Not general documents",
        body: "Documentation services prepare and digitize business papers. An invoice is a billing record. A contract archive is not this fee.",
      },
      {
        title: "Not the monthly admin desk",
        body: "Administrative support enters everyday data and keeps office records. It does not prepare the invoice run.",
      },
      {
        title: "Not advice on pricing",
        body: "Consultancy can recommend how billing should work. This service prepares and tracks the invoices you already decided to issue.",
      },
      {
        title: "Not the customer conversation",
        body: "Customer support answers enquiries. Billing can record that an invoice was questioned. It does not manage the customer relationship.",
      },
    ],
    benefitsTitle: "What the billing file gives you",
    benefitsLead: "You can see what was billed and what was paid without rebuilding the month.",
    benefits: [
      "Invoices prepared from the details you provided",
      "A status for each invoice: issued, paid, or open",
      "Billing admin limited to the invoices in the scope",
      "Financial records stored with the invoice they belong to",
    ],
    paymentLead: "This service is paid as an invoice management fee.",
    paymentBody:
      "The fee is for preparing, tracking, and filing the invoices in the scope. It is not a consultation fee, a monthly service fee, a document processing fee, a project milestone payment, or a contracted support fee.",
    paymentCovers: [
      "The invoices named in the scope",
      "Payment tracking for those invoices",
      "The billing records that go with them",
    ],
    faqs: [
      {
        question: "Do you decide what to charge?",
        answer:
          "No. You provide the amounts and the description. Advice on how the business should price or structure billing is business consultancy, paid as a consultation fee.",
      },
      {
        question: "Is this the same as filing all company documents?",
        answer:
          "No. General document preparation and digitization are documentation services, paid as a document processing fee. This fee is for invoices and the records around them.",
      },
      {
        question: "Will you chase the customer in writing?",
        answer:
          "Customer enquiries and client coordination are customer and business support, paid as a contracted support fee. Billing records the invoice and the payment status.",
      },
      {
        question: "Does the fee cover every future invoice?",
        answer:
          "It covers the invoices in the agreed scope. A later batch is agreed again. It is not an open-ended monthly desk.",
      },
      {
        question: "When does invoice work start?",
        answer:
          "After the invoice list and the invoice management fee are agreed. Sharing a spreadsheet does not start the work by itself.",
      },
      {
        question: "What do we receive?",
        answer:
          "The prepared invoices, the payment status for each one, and the organized billing records that were part of the scope.",
      },
    ],
  },
  "customer-business-support": {
    heroTitle: "Customer questions answered, and the thread kept",
    heroBody:
      "Customer and business support is the outward conversation: enquiries that need a reply, clients who need coordination, service requests that need an owner, and the business communication around them.",
    heroCards: [
      {
        title: "Enquiries",
        body: "Customer questions logged and answered inside the scope you set.",
      },
      {
        title: "Client coordination",
        body: "The next step with a client written down, not left in a thread.",
      },
      {
        title: "A handled request",
        body: "Service requests tracked through to a reply or a handoff.",
      },
    ],
    detailsTitle: "What customer support includes",
    detailsLead: "Communication with customers and clients, under a contract for that support.",
    detailsBody:
      "We handle the enquiries, client coordination, service requests, and business messages you named. The result is a reply and a record of what was said. It is not the internal filing desk, the invoice run, or a business plan.",
    detailsPoints: [
      {
        title: "Customer enquiry management",
        body: "Questions received, logged, and answered using the information and the tone you provided.",
      },
      {
        title: "Client coordination",
        body: "Follow-ups with clients so a request has a next step and a person waiting on it.",
      },
      {
        title: "Service requests",
        body: "Requests tracked from the first message to the reply or the handoff you agreed.",
      },
      {
        title: "Business communication",
        body: "The messages that have to go out for the business, drafted and sent within the scope.",
      },
    ],
    differentTitle: "How customer support is different",
    differentLead: "This service faces the customer. The others face the plan, the office, the file, the project, or the invoice.",
    differentPoints: [
      {
        title: "Not internal administration",
        body: "Administrative support keeps internal records and data entry. It does not answer the customer.",
      },
      {
        title: "Not the invoice",
        body: "Billing prepares invoices and tracks payment. Customer support can hear that a customer is asking about a bill. It does not create the invoice.",
      },
      {
        title: "Not a consultation",
        body: "Consultancy recommends how communication should work. This service sends and tracks the messages.",
      },
      {
        title: "Not project coordination",
        body: "Project support manages tasks toward a milestone. A customer enquiry is not a project task unless you have agreed a separate project.",
      },
    ],
    benefitsTitle: "What changes for the customer conversation",
    benefitsLead: "Enquiries stop disappearing into a shared inbox.",
    benefits: [
      "Each enquiry has a status, not just a timestamp",
      "Client follow-ups happen against the steps you agreed",
      "Service requests are handed on with a record of what was already said",
      "Business messages stay consistent with the information you supplied",
    ],
    paymentLead: "This service is paid as a contracted support fee.",
    paymentBody:
      "The fee is for the customer and client communication in the contract you agreed. It is not a consultation fee, a monthly service fee for internal admin, a document processing fee, a project milestone payment, or an invoice management fee.",
    paymentCovers: [
      "The enquiries and requests named in the contract",
      "Client coordination inside that scope",
      "A record of the messages that were handled",
    ],
    faqs: [
      {
        question: "Is this the same as monthly office administration?",
        answer:
          "No. The monthly desk for records and data entry is administrative support. This fee is for customer and client communication.",
      },
      {
        question: "Will you prepare invoices if a customer asks for one?",
        answer:
          "No. Preparing and tracking invoices is billing and invoice management, paid as an invoice management fee. This service can record the request and pass it on if that handoff was agreed.",
      },
      {
        question: "Do you decide what the business should say?",
        answer:
          "You provide the information and the boundaries. Advice on how the business should communicate in general is business consultancy, paid as a consultation fee.",
      },
      {
        question: "Are all channels included?",
        answer:
          "Only the channels and the request types in the contract. A new channel is a change of scope, not an assumption.",
      },
      {
        question: "When does support start?",
        answer:
          "After the contract scope and the contracted support fee are agreed. A busy inbox does not start the work by itself.",
      },
      {
        question: "What do we receive?",
        answer:
          "Handled enquiries, coordinated client follow-ups, and a record of the requests and messages that were completed in the scope.",
      },
    ],
  },
};
