import React, { useState } from 'react';
import { ShieldCheck, FileText, Landmark, Calculator, BookOpen, Download, UserCheck, CheckCircle } from 'lucide-react';
import './NRIJourney.css';

export default function NRIJourney({ onSubmitLead, trackEngagement }) {
  const [activeSubTab, setActiveSubTab] = useState('fema');
  
  // Tax Estimator State
  const [propertyValue, setPropertyValue] = useState(100); // 100 Lakhs
  const [nriType, setNriType] = useState('nri'); // nri or oci
  
  // PoA Draft Builder State
  const [poaData, setPoaData] = useState({
    nriName: '',
    passportNum: '',
    representativeName: '',
    representativeRelation: '',
    propertyLoc: 'Palakkad',
    powerScope: 'Registration & Signing Only'
  });
  const [poaGeneratedText, setPoaGeneratedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // FEMA checklist
  const femaItems = [
    { title: 'Remittance Source', text: 'Funds must be remitted via standard banking channels from NRE/NRO/FCNR accounts.' },
    { title: 'Permitted Real Estate', text: 'NRIs can acquire residential or commercial property, excluding agricultural land/plantations.' },
    { title: 'Repatriation Limits', text: 'Sale proceeds of up to two residential properties can be repatriated out of India without special approvals.' },
    { title: 'Taxes on Sale', text: 'TDS of 20% (plus surcharge/cess) applies to long-term capital gains on property sales.' }
  ];

  // Calculate TDS Estimates
  const propertyCost = propertyValue * 100000;
  const tdsBase = propertyCost * 0.01; // 1% TDS on property purchase in India for residents, but for NRIs TDS can be higher if purchasing from an NRI (e.g., 20%). Here we estimate the TDS rate for purchase.
  const gstBase = propertyCost * 0.05; // 5% GST standard estimate
  const stampDuty = propertyCost * 0.07; // 7% Stamp Duty Kerala/Coimbatore average
  const totalInvestment = propertyCost + stampDuty + gstBase;

  const handleGeneratePoA = (e) => {
    e.preventDefault();
    if (!poaData.nriName || !poaData.representativeName) return;

    // Trigger engagement score track
    if (trackEngagement) trackEngagement(15);

    const draft = `POWER OF ATTORNEY (DRAFT OVERVIEW)

KNOW ALL MEN BY THESE PRESENTS THAT I, ${poaData.nriName.toUpperCase()}, holding Passport No: ${poaData.passportNum || 'XXXXXXXX'}, currently residing overseas, do hereby nominate, constitute, and appoint ${poaData.representativeName.toUpperCase()} (Relationship: ${poaData.representativeRelation || 'Attorney-in-Fact'}) residing at ${poaData.propertyLoc}, India, to be my lawful Attorney-in-Fact.

My Attorney-in-Fact is authorized to act on my behalf to execute, sign, and register all necessary documents, sale agreements, and deeds related to the acquisition of property at Victoria Realtors projects in ${poaData.propertyLoc}.

SCOPE OF POWER: ${poaData.powerScope}

IN WITNESS WHEREOF, I have signed this Power of Attorney on this ${new Date().toLocaleDateString()} in the presence of witnesses.

Principal: ${poaData.nriName.toUpperCase()}
Attorney: ${poaData.representativeName.toUpperCase()}`;

    setPoaGeneratedText(draft);
  };

  const handleCopyPoA = () => {
    navigator.clipboard.writeText(poaGeneratedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="nri-journey-container animate-fade-in">
      <div className="nri-hero-banner">
        <div className="container">
          <span className="nri-subtitle">Global Investor Hub</span>
          <h1 className="nri-title">NRI Investment Journey</h1>
          <p className="nri-desc">
            A comprehensive gateway customized for Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) looking to secure premium luxury properties in Kerala and Coimbatore.
          </p>
        </div>
      </div>

      <div className="container nri-main-layout">
        
        {/* Left Side: Navigation Tabs */}
        <div className="nri-sidebar-menu">
          <button 
            className={`nri-menu-btn ${activeSubTab === 'fema' ? 'active' : ''}`}
            onClick={() => { setActiveSubTab('fema'); if (trackEngagement) trackEngagement(5); }}
          >
            <Landmark size={18} /> FEMA Regulations
          </button>
          <button 
            className={`nri-menu-btn ${activeSubTab === 'tax' ? 'active' : ''}`}
            onClick={() => { setActiveSubTab('tax'); if (trackEngagement) trackEngagement(5); }}
          >
            <Calculator size={18} /> Tax & Cost Estimator
          </button>
          <button 
            className={`nri-menu-btn ${activeSubTab === 'poa' ? 'active' : ''}`}
            onClick={() => { setActiveSubTab('poa'); if (trackEngagement) trackEngagement(5); }}
          >
            <UserCheck size={18} /> Power of Attorney Builder
          </button>
          <button 
            className={`nri-menu-btn ${activeSubTab === 'guide' ? 'active' : ''}`}
            onClick={() => { setActiveSubTab('guide'); if (trackEngagement) trackEngagement(5); }}
          >
            <BookOpen size={18} /> NRI Investment Checklist
          </button>
        </div>

        {/* Right Side: Tab Contents */}
        <div className="nri-content-area">
          
          {/* FEMA Regulations Tab */}
          {activeSubTab === 'fema' && (
            <div className="nri-card glass-card">
              <h2>FEMA Guidelines & Remittance Compliance</h2>
              <p className="nri-section-intro">
                Under Reserve Bank of India (RBI) rules and the Foreign Exchange Management Act (FEMA), purchasing property in India is highly streamlined for NRIs. Review essential compliance facts below:
              </p>
              
              <div className="fema-grid">
                {femaItems.map((item, idx) => (
                  <div key={idx} className="fema-item-card">
                    <div className="fema-icon-wrapper">
                      <ShieldCheck size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tax Estimator Tab */}
          {activeSubTab === 'tax' && (
            <div className="nri-card glass-card">
              <h2>NRI Property Investment Tax Estimator</h2>
              <p className="nri-section-intro">
                Input your planned property budget to estimate standard stamp duties, GST, and potential total transaction costs.
              </p>

              <div className="estimator-split">
                <div className="estimator-form">
                  <div className="form-group">
                    <label>Target Property Budget (₹ {propertyValue} Lakhs)</label>
                    <input 
                      type="range" 
                      min="40" 
                      max="400" 
                      value={propertyValue} 
                      onChange={(e) => setPropertyValue(parseInt(e.target.value))} 
                      className="budget-slider"
                    />
                    <div className="slider-limits">
                      <span>₹ 40 L</span>
                      <span>₹ 4 Cr</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Investor Category</label>
                    <select value={nriType} onChange={(e) => setNriType(e.target.value)}>
                      <option value="nri">Non-Resident Indian (NRI)</option>
                      <option value="oci">Overseas Citizen of India (OCI)</option>
                    </select>
                  </div>
                </div>

                <div className="estimator-results-card">
                  <h3>Transaction Cost Estimates</h3>
                  <div className="results-list">
                    <div className="result-row">
                      <span>Property Base Cost:</span>
                      <strong>₹ {propertyValue}.0 Lakhs</strong>
                    </div>
                    <div className="result-row">
                      <span>Approx. GST (5%):</span>
                      <span>₹ {(gstBase / 100000).toFixed(2)} Lakhs</span>
                    </div>
                    <div className="result-row">
                      <span>Kerala Stamp Duty & Reg (approx 7%):</span>
                      <span>₹ {(stampDuty / 100000).toFixed(2)} Lakhs</span>
                    </div>
                    <div className="result-row divider">
                      <span>Total Estimated Cost:</span>
                      <strong className="text-primary">₹ {(totalInvestment / 100000).toFixed(2)} Lakhs</strong>
                    </div>
                  </div>
                  <span className="disclaimer">* Disclaimer: Estimations exclude legal fees and utility connection deposits.</span>
                </div>
              </div>
            </div>
          )}

          {/* PoA Builder Tab */}
          {activeSubTab === 'poa' && (
            <div className="nri-card glass-card">
              <h2>Interactive Power of Attorney (PoA) Draft Builder</h2>
              <p className="nri-section-intro">
                NRIs who cannot travel to India to sign sale deeds can execute a Power of Attorney (PoA) in favor of a local representative. Configure a custom legal POA draft below:
              </p>

              <div className="poa-split-layout">
                <form onSubmit={handleGeneratePoA} className="poa-input-form">
                  <div className="form-group">
                    <label>Principal (NRI) Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Vivek Menon" 
                      required 
                      value={poaData.nriName}
                      onChange={(e) => setPoaData(prev => ({ ...prev, nriName: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label>Passport Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Z1234567" 
                      value={poaData.passportNum}
                      onChange={(e) => setPoaData(prev => ({ ...prev, passportNum: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label>Attorney-in-Fact (Representative Name) *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Suresh Menon" 
                      required 
                      value={poaData.representativeName}
                      onChange={(e) => setPoaData(prev => ({ ...prev, representativeName: e.target.value }))}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Relationship</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Father, Brother" 
                        value={poaData.representativeRelation}
                        onChange={(e) => setPoaData(prev => ({ ...prev, representativeRelation: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label>Property State/City</label>
                      <select 
                        value={poaData.propertyLoc}
                        onChange={(e) => setPoaData(prev => ({ ...prev, propertyLoc: e.target.value }))}
                      >
                        <option value="Palakkad">Palakkad</option>
                        <option value="Thrissur">Thrissur</option>
                        <option value="Trivandrum">Trivandrum</option>
                        <option value="Coimbatore">Coimbatore</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Scope of Representation Authority</label>
                    <select 
                      value={poaData.powerScope}
                      onChange={(e) => setPoaData(prev => ({ ...prev, powerScope: e.target.value }))}
                    >
                      <option value="Registration & Signing Only">Registration & Signing Only</option>
                      <option value="Loan Application & Bank Signing Only">Loan Application & Bank Signing Only</option>
                      <option value="Full Rights (Signing, Buying, Selling, Submitting)">Full Rights (Signing, Buying, Selling, Submitting)</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">Generate Legal POA Draft</button>
                </form>

                <div className="poa-preview-box">
                  <h3>PoA Draft Preview</h3>
                  {poaGeneratedText ? (
                    <div className="draft-preview-wrapper">
                      <pre className="poa-pre">{poaGeneratedText}</pre>
                      <button className="btn btn-secondary btn-block flex-center" onClick={handleCopyPoA}>
                        {isCopied ? <CheckCircle size={16} /> : <Download size={16} />}
                        {isCopied ? 'Copied to Clipboard!' : 'Copy Draft Text'}
                      </button>
                    </div>
                  ) : (
                    <div className="poa-draft-placeholder">
                      <FileText size={48} className="text-muted" />
                      <p>Complete the form details on the left to compile your legal Power of Attorney overview draft.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Checklist Tab */}
          {activeSubTab === 'guide' && (
            <div className="nri-card glass-card">
              <h2>NRI Investment Process Checklist</h2>
              <p className="nri-section-intro">
                Follow this step-by-step roadmap from choosing your gated community layout to taking key handovers:
              </p>

              <div className="checklist-flow">
                {[
                  { title: 'Step 1: Choose Property & Gated Community Layout', desc: 'Select your preferred 3BHK or 4BHK plot layout from our approved listing catalogue.' },
                  { title: 'Step 2: Obtain NRE/NRO Banking Clearances', desc: 'Ensure your Indian remittance accounts are functional to transfer funds cleanly.' },
                  { title: 'Step 3: Appoint Attorney-in-Fact (Optional)', desc: 'If unable to visit, execute the PoA document in the presence of an embassy consular.' },
                  { title: 'Step 4: Execute Sale Agreement', desc: 'Submit initial Booking Advance (typically 10%) to draw the formal Sale Deed.' },
                  { title: 'Step 5: Registration & RERA Approvals', desc: 'Complete state sub-registrar registration formalities through your POA attorney.' }
                ].map((step, idx) => (
                  <div key={idx} className="checklist-node">
                    <div className="node-number">{idx + 1}</div>
                    <div className="node-info">
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
