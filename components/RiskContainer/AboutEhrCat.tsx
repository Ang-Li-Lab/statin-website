import React from "react";

const AboutEhrCat: React.FC = () => {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert">
      <h3>Short video summary</h3>
      <p>
        <a href="https://www.youtube.com/watch?v=hTZdrAnHFIU" target="_blank" rel="noopener">
          Watch on YouTube
        </a>
      </p>

      <h3>Developer insights</h3>
      <p>
        This tool (EHR-CAT) was derived and validated in patients with newly
        diagnosed active cancer undergoing first-line systemic therapy
        (chemotherapy, immune checkpoint inhibitor (ICI), targeted therapy, or
        endocrine therapy) within 12 months of diagnosis.
      </p>
      <p>
        The discrimination and calibration have been verified in multiple cancer
        cohorts across diverse patient populations (underserved/uninsured public
        health system, government-insured health system, and a comprehensive
        cancer center). While EHR-CAT can be used to generate a predictive VTE
        risk (%) at different time intervals for individual cancer types, its
        underlying discriminative performance (c-statistic) should be evaluated
        only in large cohorts that include all cancer types receiving upfront
        systemic therapy. Inappropriate cohort selection is the most common
        reason for poor performance of this tool (and other validated RAMs).
      </p>
      <p>
        The tool can be populated manually by a clinician or generated from
        electronic health record (EHR) data using demographics, ICD codes,
        medications, and labs. Please contact the authors if you are interested
        in obtaining the SQL extraction algorithm for Epic Clarity. We are
        actively working to integrate EHR-CAT into clinical decision support
        (CDS) to help clinicians assess individual patients’ risk profiles when
        considering antithrombotic preventive measures in high-risk cancer
        patients.
      </p>

      <h3>Detailed definitions of clinical variables</h3>
      <dl>
        <dt>Cancer type/histology</dt>
        <dd>
          Choose the active cancer type from the list. This can be
          entered manually or mapped via ICD-O-3 or ICD-10-CM codes (email the
          authors for a detailed breakdown). If multiple cancers are present,
          choose the cancer most active for the current treatment.
        </dd>

        <dt>Pre-therapy BMI</dt>
        <dd>
          Use the closest weight/height on/before the first day of 
          the current line of systemic therapy in last 12 months.
        </dd>

        <dt>Pre-therapy WBC</dt>
        <dd>
          Use the closest complete blood count (CBC) on/before the first day of 
          the current line of systemic therapy in last 3 months.
        </dd>

        <dt>Pre-therapy Hgb</dt>
        <dd>
          Use the closest CBC on/before the first day of 
          the current line of systemic therapy in last 3 months.
        </dd>

        <dt>Pre-therapy Plt</dt>
        <dd>
          Use the closest CBC on/before the first day of 
          the current line of systemic therapy in last 3 months.
        </dd>

        <dt>Cancer stage</dt>
        <dd>
          Choose the current cancer stage; specifically, 
          early stage = locoregional or AJCC stage I-II; 
          advanced stage = locally advanced/metastatic 
          or AJCC stage III-IV; 
          if a cancer is not typically stageable 
          (i.e. brain cancer, most non-lymphoma hematologic malignancy), choose Unknown
        </dd>

        <dt>History of VTE</dt>
        <dd>
          Select “Yes” if patient has ever had a prior venous thromboembolism (VTE) diagnosis 
          (pulmonary embolism [PE] or lower/upper extremity deep vein thrombosis [DVT]) 
          in their lifetime; do NOT count tumor thrombus or splanchnic vein thrombus. 
          See Reference 2 for ICD-10-CM codes.
        </dd>

        <dt>History of paralysis/immobility</dt>
        <dd>
          Select “Yes” if the patient has a diagnosis of paralysis, hemiparesis, paraplegia, 
          quadriplegia, cauda equina syndrome from spinal cord compression in the last 12 months; 
          a documented ECOG Performance Status of 3-4 also counts as “Yes”. See Reference 3 for
          ICD-10-CM codes.
        </dd>

        <dt>Recent/current hospitalization</dt>
        <dd>
          Select “Yes” if the patient has been hospitalized for &gt; 3
          consecutive days within the last 3 months, including if patient is currently hospitalized.
        </dd>

        <dt>Type of systemic therapy</dt>
        <dd>
          Review the current/new line of therapy the patient 
          is starting/recently started in the Episodes tab in Epic;
          select “No” if the regimen contains{" "}
          <strong>any</strong> chemo or ICI. List of common chemo and ICI are shown in Reference 1.
        </dd>

        <dt>Patient race</dt>
        <dd>
          Use the patient’s self-reported race. Apply the <a href="https://grants.nih.gov/grants/guide/notice-files/NOT-OD-15-089.html" target="_blank" rel="noopener">NIH definition</a> for
          Asian/Pacific Islander.
        </dd>
      </dl>

      <h3 id="references">References</h3>

      <details className="not-prose rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/40">
        <summary className="cursor-pointer font-semibold">
          Reference 1: Chemo and ICI drugs (as of 8/2025)
        </summary>
        <ul className="mt-2 space-y-2 text-sm break-words">
          <li>
            <span className="font-semibold">Chemo: </span>
            altretamine, amsacrine, asparaginase, azacitidine, bendamustine, bleomycin, busulfan, cabazitaxel, calaspargase, capecitabine, carboplatin,
            carmustine, chlorambucil, cisplatin, cladribine, clofarabine, cyclophosphamide, cytarabine, dacarbazine, dactinomycin, daunorubicin, decitabine,
            docetaxel, doxorubicin, epirubicin, eribulin, etoposide, fotemustine, floxuridine, fludarabine, fluorouracil, gemcitabine, hydroxyurea, idarubicin, ifosfamide,
            irinotecan, ixabepilone, lomustine, lurbinectedin, mechlorethamine, melphalan, mercaptopurine, methotrexate, mitomycin, mitoxantrone, nelarabine,
            omacetaxine, oxaliplatin, paclitaxel, pegaspargase, pemetrexed, pentostatin, plicamycin, porfimer, pralatrexate, procarbazine, raltitrexed, streptozocin, tegafur, temozolomide,
            teniposide, thioguanine, thiotepa, topotecan, trabectedin, trifluridine, treosulfan, uracil, valrubicin, vinblastine, vincristine, vindesine, vinflunine, vinorelbine
          </li>
          <li>
            <span className="font-semibold">ICI: </span>
            atezolizumab, avelumab, cemiplimab, cosibelimab, durvalumab, ipilimumab, nivolumab, pembrolizumab, penpulimab, retifanlimab, tislelizumab, toripalimab
          </li>
        </ul>
      </details>

      <details className="not-prose mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/40">
        <summary className="cursor-pointer font-semibold">
          Reference 2: VTE ICD-10-CM codes (facility coded diagnosis, professional coded diagnosis, problem list, medical history)
        </summary>
        <p className="mt-2 text-sm">
          <code className="block whitespace-pre-wrap break-words">
            I26.02, I26.09, I26.92, I26.93, I26.94, I26.99, I80.10, I80.11, I80.12, I80.13, I80.201, I80.202,
            I80.203, I80.209, I80.211, I80.212, I80.213, I80.219, I80.221, I80.222, I80.223, I80.229,
            I80.231, I80.232, I80.233, I80.239, I80.241, I80.242, I80.243, I80.249, I80.251, I80.252,
            I80.253, I80.259, I80.291, I80.292, I80.293, I80.299, I82.220, I82.401, I82.402, I82.403, I82.409, I82.411, I82.412, 
            I82.413, I82.419, I82.421, I82.422, I82.423, I82.429, I82.431, I82.432, I82.433, I82.439, I82.441, I82.442, I82.443, 
            I82.449, I82.451, I82.452, I82.453, I82.459, I82.461, I82.462, I82.463, I82.469, I82.491, I82.492, I82.493, I82.499, 
            I82.4Y1, I82.4Y2, I82.4Y3, I82.4Y9, I82.4Z1, I82.4Z2, I82.4Z3, I82.4Z9, 
            I82.210, I82.290, I82.621, I82.622, I82.623, I82.629, I82.A11, I82.A12, I82.A13, I82.A19, I82.B11, I82.B12, I82.B13, 
            I82.B19, I82.C11, I82.C12, I82.C13, I82.C19, I82.601, I82.602, I82.603, I82.609, 
            I82.211, I82.221, I82.291, I82.501, I82.502, I82.503, I82.509, I82.511, I82.512, I82.513, I82.519, I82.521, 
            I82.522, I82.523, I82.529, I82.531, I82.532, I82.533, I82.539, I82.541, I82.542, I82.543, I82.549, I82.551, I82.552, 
            I82.553, I82.559, I82.561, I82.562, I82.563, I82.569, I82.591, I82.592, I82.593, I82.599, I82.5Y1, I82.5Y2, I82.5Y3, 
            I82.5Y9, I82.5Z1, I82.5Z2, I82.5Z3, I82.5Z9, I82.701, I82.702, I82.703, I82.709, I82.721, I82.722, I82.723, I82.729, 
            I82.891, I82.91, I82.A21, I82.A22, I82.A23, I82.A29, I82.B21, I82.B22, I82.B23, I82.B29, I82.C21, I82.C22, I82.C23, 
            I82.C29, Z86.711, Z86.718
          </code>
        </p>
      </details>

      <details className="not-prose mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/40">
        <summary className="cursor-pointer font-semibold">
          Reference 3: Paralysis ICD-10-CM codes (facility coded diagnosis, professional coded diagnosis, problem list, medical history)
        </summary>
        <p className="mt-2 text-sm">
          <code className="block whitespace-pre-wrap break-words">
            G04.1, G11.4, G80.1, G80.2, G81*, G82*, G83.0*, G83.1*, G83.2*, G83.3*, G83.4*, G83.9*
          </code>
        </p>
      </details>
    </div>
  );
};

export default AboutEhrCat;
