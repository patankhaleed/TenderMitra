import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// FAQ data
const FAQs: FAQ[] = [
  // Basics
  {
    id: "1",
    question: "What is a government tender?",
    answer: "A government tender is a formal invitation by a government entity inviting bids from potential suppliers or contractors for goods, services, or works required by the government. It's a transparent procurement process to ensure competitive pricing and fair selection of vendors.",
    category: "Basics"
  },
  {
    id: "2",
    question: "How do I find government tenders?",
    answer: "Government tenders can be found on official procurement portals like eProcure, Central Public Procurement Portal (CPPP), various state government procurement portals, and department-specific websites. You can also subscribe to tender alert services or check newspaper advertisements in the tender section.",
    category: "Basics"
  },
  {
    id: "3",
    question: "What is the difference between national and international tenders?",
    answer: "National tenders are open only to domestic bidders within a country, while international tenders invite bids from global vendors. International tenders typically have higher value thresholds, longer submission periods, and may have specific requirements regarding foreign participation, such as joint ventures with local firms or technology transfer conditions.",
    category: "Basics"
  },
  {
    id: "4",
    question: "Who can participate in government tenders in India?",
    answer: "Any registered business entity (proprietorship, partnership, company) can participate in government tenders in India if they meet the eligibility criteria. This includes MSMEs, startups, large corporations, and even joint ventures. Foreign companies may participate in Global Tender Enquiries (GTEs) or through joint ventures with Indian companies, subject to specific tender conditions.",
    category: "Basics"
  },
  // Documentation
  {
    id: "5",
    question: "What documents are required to bid for a tender?",
    answer: "Common documents include: Company registration certificate, GST registration, PAN card, Income Tax returns, audited financial statements, work experience certificates, client testimonials, bank solvency certificate, EMD (Earnest Money Deposit), and technical specifications/compliance documents. The exact requirements vary by tender.",
    category: "Documentation"
  },
  {
    id: "6",
    question: "What are the common reasons for tender disqualification?",
    answer: "Common disqualification reasons include: Incomplete documentation, missing signatures, non-compliance with technical specifications, failure to submit EMD or tender fee, late submission, conditional bids, not meeting eligibility criteria, errors in price calculation, modification of tender documents, and improper submission format (single envelope vs. two-envelope system).",
    category: "Documentation"
  },
  {
    id: "7",
    question: "How important is formatting in tender documents?",
    answer: "Proper formatting is critical as it ensures your bid is evaluated correctly. Follow all formatting guidelines specified in the tender document—including page limits, font sizes, section organization, and file formats. Standardized forms must be completed exactly as required without alterations. Non-compliance with formatting requirements can lead to disqualification regardless of the quality of your technical proposal or price competitiveness.",
    category: "Documentation"
  },
  // Financial
  {
    id: "8",
    question: "What is Earnest Money Deposit (EMD) and why is it required?",
    answer: "EMD is a security deposit submitted by bidders to demonstrate their seriousness in the bidding process. It protects the tender issuer against bidders who might withdraw or modify their bids during the bid validity period. EMD is typically returned to unsuccessful bidders after the tendering process is complete.",
    category: "Financial"
  },
  {
    id: "9",
    question: "What is performance security/bank guarantee?",
    answer: "Performance security is a financial guarantee that the winning bidder must provide to ensure they will fulfill all obligations under the contract. It's typically 5-10% of the contract value and remains valid throughout the contract period plus warranty period. If the supplier fails to perform, the government can encash this guarantee as compensation.",
    category: "Financial"
  },
  {
    id: "10",
    question: "How is a bid price calculated for government tenders?",
    answer: "Bid pricing should account for: Direct costs (materials, labor, equipment), indirect costs (overheads, administrative expenses), logistics, taxes (GST, customs duties if applicable), insurance, compliance costs, contingencies (usually 5-10%), financial charges (EMD, performance guarantee costs), and a reasonable profit margin. Government tender pricing often requires detailed cost breakdowns and justifications for each component.",
    category: "Financial"
  },
  {
    id: "11",
    question: "What payment terms are typical in government contracts?",
    answer: "Government payment terms typically include: Stage-wise payments linked to deliverables/milestones, inspection and verification periods before payment processing, retention money (often 5-10% held until project completion), documentary requirements for payment processing, processing timeframes (usually 30-45 days), and provisions for delayed payments. Some tenders may offer mobilization advances against bank guarantees.",
    category: "Financial"
  },
  // Process
  {
    id: "12",
    question: "How is a tender winner selected?",
    answer: "Tender selection typically follows either: 1) Lowest Bid (L1) method - where the qualified bidder with the lowest price wins, 2) Quality and Cost Based Selection (QCBS) - where both technical quality and price are weighted, or 3) Technical qualification followed by reverse auction. The specific selection method is mentioned in the tender document.",
    category: "Process"
  },
  {
    id: "13",
    question: "What is the difference between technical bid and financial bid?",
    answer: "A technical bid contains documents demonstrating the bidder's eligibility, qualifications, and technical capacity to execute the project as per specifications. A financial bid contains the price quotation or commercial terms. Most tenders use a two-envelope system where technical bids are evaluated first, and only technically qualified bidders' financial bids are opened.",
    category: "Process"
  },
  {
    id: "14",
    question: "What happens after submitting a bid?",
    answer: "After submission, the tender follows these stages: 1) Bid opening (technical bids first, financial bids later), 2) Technical evaluation against predetermined criteria, 3) Announcement of technically qualified bidders, 4) Financial bid opening for qualified bidders, 5) Price comparison and ranking, 6) Award of contract to selected bidder, 7) Issuance of purchase/work order, and 8) Contract signing and commencement.",
    category: "Process"
  },
  {
    id: "15",
    question: "What is a pre-bid meeting and why is it important?",
    answer: "A pre-bid meeting is a conference held by the tender issuing authority before the bid submission deadline. It allows potential bidders to seek clarifications on tender requirements, specifications, and terms. Attending pre-bid meetings is crucial as it provides insights into the purchaser's expectations, clarifies ambiguities, allows networking with potential partners/competitors, and may reveal important information not explicitly stated in tender documents.",
    category: "Process"
  },
  // Legal
  {
    id: "16",
    question: "Can tender specifications be challenged?",
    answer: "Yes, bidders can challenge tender specifications if they believe they are restrictive, biased, or ambiguous. Most procurement portals have a pre-bid query system where potential bidders can seek clarifications or suggest changes to specifications. For significant issues, bidders can file complaints with the procuring entity or relevant oversight authorities.",
    category: "Legal"
  },
  {
    id: "17",
    question: "What are the key compliance requirements in government tenders?",
    answer: "Key compliance requirements include: 1) Following the Public Procurement Policy 2017, 2) Meeting tender-specific eligibility criteria, 3) Adhering to labor laws and minimum wage requirements, 4) Environmental compliance, 5) Quality standards compliance (ISO, BIS, etc.), 6) Restrictions on countries sharing land borders with India under Rule 144(xi) of GFR, 7) MSE/Startup preferences if applicable, and 8) Local content requirements under Make in India policy.",
    category: "Legal"
  },
  {
    id: "18",
    question: "What recourse do I have if my bid is unfairly rejected?",
    answer: "If you believe your bid was unfairly rejected, you can: 1) Request a debriefing from the procurement entity, 2) File a formal representation/appeal with the tender authority, 3) Lodge a complaint with the Central Vigilance Commission or relevant oversight body, 4) Approach the Competition Commission if anti-competitive practices are suspected, or 5) File a writ petition in the High Court as a last resort. Document all communications and maintain evidence supporting your claim.",
    category: "Legal"
  },
  // Specialized Categories
  {
    id: "19",
    question: "How can startups participate in government tenders?",
    answer: "The Indian government has introduced several measures to support startups: 1) Exemption from prior experience and turnover requirements in certain tenders, 2) No EMD requirement for registered startups, 3) Relaxed norms for public procurement, and 4) Special startup-focused tenders. Startups should register under the Startup India initiative to avail these benefits.",
    category: "Specialized Groups"
  },
  {
    id: "20",
    question: "What benefits do MSMEs get in the tender process?",
    answer: "MSMEs in India receive several benefits: 1) 25% of procurement is reserved for MSMEs, 2) Exemption or reduced EMD and tender fees, 3) Price preference up to 15% in comparative pricing, 4) No turnover criteria for tenders up to ₹50 lakhs, 5) 358 items reserved exclusively for MSME procurement, and 6) 3% sub-target for women-owned MSMEs. To avail these benefits, vendors must register under the Udyam Registration system.",
    category: "Specialized Groups"
  },
  {
    id: "21",
    question: "What is GeM (Government e-Marketplace)?",
    answer: "GeM is an online platform for procurement of goods and services by government departments, organizations, and PSUs. It provides an end-to-end solution from listing of products/services to bidding, reverse auction, ordering, and payment processing. Suppliers must register on GeM to sell to government entities through this platform.",
    category: "Platforms"
  },
  {
    id: "22",
    question: "How does the CPPP (Central Public Procurement Portal) work?",
    answer: "CPPP is the primary e-procurement platform for all central government ministries and departments. It handles the entire procurement cycle, from tender creation to award. Vendors need to register with a Digital Signature Certificate (DSC), after which they can search for tenders, download documents, submit bids electronically, and track their status. The platform automatically sends email alerts for relevant tenders and important updates.",
    category: "Platforms"
  },
  // Strategy
  {
    id: "23",
    question: "What are the common reasons for tender rejection?",
    answer: "Common reasons include: 1) Missing or incomplete documentation, 2) Not meeting eligibility criteria, 3) Submitting bids after the deadline, 4) Technical non-compliance with specifications, 5) Errors in financial calculations, 6) Not signing or stamping required documents, 7) Insufficient EMD amount, and 8) Conditional bids when not permitted.",
    category: "Strategy"
  },
  {
    id: "24",
    question: "How can I improve my chances of winning a government tender?",
    answer: "To improve your chances: 1) Ensure 100% compliance with eligibility criteria, 2) Provide comprehensive documentation, 3) Attend pre-bid meetings, 4) Form strategic partnerships if needed, 5) Price competitively based on market research, 6) Highlight unique strengths and USPs, 7) Ensure error-free submission, and 8) Build a track record with smaller contracts first.",
    category: "Strategy"
  },
  {
    id: "25",
    question: "How should I handle complex technical specifications?",
    answer: "For complex technical specifications: 1) Create a compliance matrix mapping your solution against each requirement, 2) Hire domain experts if needed to ensure accurate understanding, 3) Seek clarifications during pre-bid meetings for ambiguous points, 4) Provide detailed explanations and supporting documentation for your proposed solution, 5) Include relevant case studies and testimonials, and 6) Consider offering value-added features without deviating from the core requirements.",
    category: "Strategy"
  },
  {
    id: "26",
    question: "When should I consider forming a consortium or joint venture?",
    answer: "Consider forming a consortium when: 1) The tender requires capabilities beyond your core expertise, 2) Financial requirements exceed your capacity, 3) There are geographic scope requirements you can't fulfill alone, 4) The project requires specialized technology or equipment you don't possess, or 5) Risk mitigation is needed for large projects. Ensure proper documentation of the consortium agreement and clear definition of roles, responsibilities, and liability sharing.",
    category: "Strategy"
  }
];

// Group FAQs by category
const groupedFAQs = FAQs.reduce((groups, faq) => {
  if (!groups[faq.category]) {
    groups[faq.category] = [];
  }
  groups[faq.category].push(faq);
  return groups;
}, {} as Record<string, FAQ[]>);

export const TenderFAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(Object.keys(groupedFAQs)[0]);
  
  return (
    <div className="py-16 bg-[#1A2A44]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-cinzel text-primary mb-4">Frequently Asked Questions</h2>
          <p className="text-xl font-montserrat text-white/80 max-w-3xl mx-auto">
            Find answers to common questions about government tenders, bidding processes, and how to overcome challenges.
          </p>
        </motion.div>
        
        {/* Category navigation */}
        <div className="mb-12 flex justify-center">
          <div className="flex flex-wrap justify-center gap-3">
            {Object.keys(groupedFAQs).map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-primary text-[#1A2A44]' 
                    : 'bg-[#D4AF37]/10 text-[#D4AF37]/90 hover:bg-[#D4AF37]/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {groupedFAQs[activeCategory].map((faq) => (
                  <AccordionItem key={faq.id} faq={faq} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

interface AccordionItemProps {
  faq: FAQ;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = () => setIsOpen(!isOpen);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <div 
        onClick={toggleOpen}
        className={`
          p-5 rounded-t-lg cursor-pointer flex justify-between items-center transition-all
          ${isOpen 
            ? 'bg-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
            : 'bg-[#1A2A44]/80 hover:bg-[#1A2A44]/60 border border-[#D4AF37]/10 rounded-b-lg'
          }
        `}
      >
        <h3 className="font-cinzel text-lg text-primary flex-1 pr-4">{faq.question}</h3>
        <div className={`text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`
              p-5 rounded-b-lg font-montserrat bg-[#1A2A44]/40 border-b border-l border-r border-[#D4AF37]/10
              ${isOpen ? 'border-[#D4AF37]/20' : ''}
            `}>
              <p className="text-white/90 leading-relaxed">{faq.answer}</p>
              
              {/* Gold gradient divider at bottom */}
              <div className="h-0.5 w-full mt-4 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}; 