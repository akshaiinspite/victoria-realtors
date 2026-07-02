import React, { useState, useEffect } from 'react';
import { Calculator, Award, ShieldAlert, Sparkles, Building, Landmark } from 'lucide-react';
import './MortgageCalculator.css';

export default function MortgageCalculator() {
  const [activeTab, setActiveTab] = useState('emi');

  // TAB 1: EMI Calculator States
  const [homePrice, setHomePrice] = useState(75); // in Lakhs
  const [downPaymentPct, setDownPaymentPct] = useState(20); // in %
  const [interestRate, setInterestRate] = useState(8.5); // in %
  const [loanTerm, setLoanTerm] = useState(20); // in years
  const [selectedBank, setSelectedBank] = useState('SBI');

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [downPaymentAmt, setDownPaymentAmt] = useState(0);
  const [loanAmt, setLoanAmt] = useState(0);

  // TAB 2: Eligibility States
  const [monthlyIncome, setMonthlyIncome] = useState(100); // in thousands
  const [existingEmi, setExistingEmi] = useState(10); // in thousands
  const [eligTerm, setEligTerm] = useState(20); // in years
  const [eligRate, setEligRate] = useState(8.5); // in %

  const [maxEmiAllowed, setMaxEmiAllowed] = useState(0);
  const [maxLoanEligible, setMaxLoanEligible] = useState(0);
  const [estimatedBudget, setEstimatedBudget] = useState(0);

  // TAB 3: Investor ROI States
  const [roiBudget, setRoiBudget] = useState(75); // in Lakhs
  const [roiRent, setRoiRent] = useState(25); // in thousands
  const [roiAppreciation, setRoiAppreciation] = useState(8); // % per year
  const [roiYears, setRoiYears] = useState(5); // years

  const [rentalYield, setRentalYield] = useState(0);
  const [appreciationValue, setAppreciationValue] = useState(0);
  const [futureValue, setFutureValue] = useState(0);
  const [totalROI, setTotalROI] = useState(0);

  // TAB 1: EMI Calculations & Special Bank Rates Mapping
  const bankRates = {
    SBI: 8.40,
    HDFC: 8.45,
    ICICI: 8.50,
    Federal: 8.55,
    LIC: 8.60
  };

  useEffect(() => {
    if (bankRates[selectedBank]) {
      setInterestRate(bankRates[selectedBank]);
    }
  }, [selectedBank]);

  useEffect(() => {
    const downAmt = (homePrice * downPaymentPct) / 100;
    const principal = homePrice - downAmt;
    const monthlyRate = (interestRate / 100) / 12;
    const totalPayments = loanTerm * 12;

    setDownPaymentAmt(downAmt);
    setLoanAmt(principal);

    if (interestRate === 0) {
      setMonthlyPayment((principal * 100000) / totalPayments);
      return;
    }

    const calcMonthly = (principal * 100000 * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    setMonthlyPayment(Math.round(calcMonthly));
  }, [homePrice, downPaymentPct, interestRate, loanTerm]);

  // TAB 2: Eligibility Calculation
  useEffect(() => {
    // FOIR of 50% for standard banking qualification
    const FOIR = 0.50;
    const netEmiCapacity = Math.max((monthlyIncome * 1000 * FOIR) - (existingEmi * 1000), 0);
    setMaxEmiAllowed(netEmiCapacity);

    const monthlyRate = (eligRate / 100) / 12;
    const totalPayments = eligTerm * 12;

    if (monthlyRate === 0) {
      setMaxLoanEligible(netEmiCapacity * totalPayments);
      setEstimatedBudget(netEmiCapacity * totalPayments / 0.8 / 100000);
      return;
    }

    // P = EMI / [r(1+r)^n / ((1+r)^n - 1)]
    const factor = (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    const maxLoan = netEmiCapacity / factor;
    
    setMaxLoanEligible(Math.round(maxLoan));
    // Assume loan is 80% of property cost, downpayment is 20%
    setEstimatedBudget(Math.round(maxLoan / 0.8) / 100000);
  }, [monthlyIncome, existingEmi, eligTerm, eligRate]);

  // TAB 3: ROI Calculations
  useEffect(() => {
    const propertyVal = roiBudget * 100000;
    const annualRent = roiRent * 1000 * 12;
    
    // Rental Yield
    const yieldPct = (annualRent / propertyVal) * 100;
    setRentalYield(yieldPct.toFixed(2));

    // Future Appreciation (Compound Interest formula)
    const appreciatedVal = propertyVal * Math.pow(1 + (roiAppreciation / 100), roiYears);
    const profit = appreciatedVal - propertyVal;

    setAppreciationValue(Math.round(profit / 100000));
    setFutureValue(Math.round(appreciatedVal / 100000));

    // Total ROI % = (Total Rent + Capital Appreciation) / Initial Property Cost * 100
    const totalRentEarned = annualRent * roiYears;
    const netProfit = totalRentEarned + profit;
    const roiPct = (netProfit / propertyVal) * 100;
    setTotalROI(roiPct.toFixed(1));
  }, [roiBudget, roiRent, roiAppreciation, roiYears]);

  // Global Tracking hook
  useEffect(() => {
    const timer = setTimeout(() => {
      import('../utils/tracking').then(({ trackEvent }) => {
        trackEvent('financial_calculator_use', {
          tab: activeTab,
          details: activeTab === 'emi' ? { homePrice, interestRate, loanTerm } :
                   activeTab === 'eligibility' ? { monthlyIncome, maxLoanEligible } :
                   { roiBudget, rentalYield, totalROI }
        });
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, [activeTab, homePrice, monthlyIncome, roiBudget]);

  const formatPrice = (val) => {
    if (val >= 100) {
      return `${(val / 100).toFixed(2)} Cr`;
    }
    return `${val.toFixed(1)} Lakhs`;
  };

  const formatMonthly = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="finance-advisor" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="section-header">
          <span>Financial Planning Hub</span>
          <h2>Financial Planning Suite</h2>
          <p>Verify your EMI estimates, calculate your maximum loan eligibility, or check property ROI projections instantly.</p>
        </div>

        {/* Tab Headers */}
        <div className="finance-tabs">
          <button 
            className={`finance-tab-btn ${activeTab === 'emi' ? 'active' : ''}`}
            onClick={() => setActiveTab('emi')}
          >
            <Calculator size={18} /> Interactive EMI Calculator
          </button>
          <button 
            className={`finance-tab-btn ${activeTab === 'eligibility' ? 'active' : ''}`}
            onClick={() => setActiveTab('eligibility')}
          >
            <Landmark size={18} /> Home Loan Eligibility
          </button>
          <button 
            className={`finance-tab-btn ${activeTab === 'roi' ? 'active' : ''}`}
            onClick={() => setActiveTab('roi')}
          >
            <Building size={18} /> Investor ROI Calculator
          </button>
        </div>

        {activeTab === 'emi' && (
          <div className="calculator-grid animate-fade-in">
            {/* Input card */}
            <div className="calculator-card glass-card">
              <div className="calc-inputs">
                <div className="calc-field">
                  <div className="calc-field-header">
                    <span className="calc-label">Home Price</span>
                    <span className="calc-val">{formatPrice(homePrice)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="15" 
                    max="300" 
                    step="5" 
                    value={homePrice} 
                    onChange={(e) => setHomePrice(parseInt(e.target.value))}
                    className="range-slider"
                  />
                </div>

                <div className="calc-field">
                  <div className="calc-field-header">
                    <span className="calc-label">Down Payment (%)</span>
                    <span className="calc-val">{downPaymentPct}% ({formatPrice(downPaymentAmt)})</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="80" 
                    step="5" 
                    value={downPaymentPct} 
                    onChange={(e) => setDownPaymentPct(parseInt(e.target.value))}
                    className="range-slider"
                  />
                </div>

                <div className="calc-field">
                  <div className="calc-field-header">
                    <span className="calc-label">Interest Rate (%)</span>
                    <span className="calc-val">{interestRate}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="15" 
                    step="0.1" 
                    value={interestRate} 
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    className="range-slider"
                  />
                </div>

                <div className="calc-field">
                  <div className="calc-field-header">
                    <span className="calc-label">Loan Term</span>
                    <span className="calc-val">{loanTerm} Years</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="30" 
                    step="5" 
                    value={loanTerm} 
                    onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                    className="range-slider"
                  />
                </div>

                <div className="bank-rates-row">
                  <span className="bank-rates-title">Select Partner Bank Special Rates:</span>
                  <div className="bank-btn-grid">
                    {Object.keys(bankRates).map(bankName => (
                      <button
                        key={bankName}
                        className={`bank-rate-btn ${selectedBank === bankName ? 'active' : ''}`}
                        onClick={() => setSelectedBank(bankName)}
                      >
                        <strong>{bankName}</strong> ({bankRates[bankName]}%)
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results card */}
            <div className="calc-results-card glass-card">
              <div className="calc-result-summary">
                <p>Estimated Monthly Payment</p>
                <div className="calc-monthly-payment">{formatMonthly(monthlyPayment)}</div>
              </div>

              <div className="calc-breakdown">
                <div className="breakdown-row">
                  <div className="breakdown-label">
                    <div className="color-dot principal"></div>
                    <span>Loan Amount</span>
                  </div>
                  <div className="breakdown-val">{formatPrice(loanAmt)}</div>
                </div>

                <div className="breakdown-row">
                  <div className="breakdown-label">
                    <div className="color-dot downpayment"></div>
                    <span>Down Payment Amount</span>
                  </div>
                  <div className="breakdown-val">{formatPrice(downPaymentAmt)}</div>
                </div>

                <div className="breakdown-row" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
                  <div className="breakdown-label">
                    <Calculator size={18} className="text-primary" />
                    <span>Total Cost (Excl. Interest)</span>
                  </div>
                  <div className="breakdown-val" style={{ color: 'var(--text-primary)' }}>{formatPrice(homePrice)}</div>
                </div>
              </div>

              <a 
                href="https://wa.me/917907878203?text=Hi,%20I%20would%20like%20to%20consult%20your%20home%20loan%20experts%20regarding%20properties%20at%20Victoria%20Realtors." 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary" 
                style={{ marginTop: '2rem', width: '100%' }}
              >
                Consult Home Loan Experts
              </a>
            </div>
          </div>
        )}

        {activeTab === 'eligibility' && (
          <div className="calculator-grid animate-fade-in">
            {/* Input Card */}
            <div className="calculator-card glass-card">
              <div className="calc-inputs">
                <div className="calc-field">
                  <div className="calc-field-header">
                    <span className="calc-label">Monthly Take-Home Income</span>
                    <span className="calc-val">₹{monthlyIncome}k /month</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="300" 
                    step="5" 
                    value={monthlyIncome} 
                    onChange={(e) => setMonthlyIncome(parseInt(e.target.value))}
                    className="range-slider"
                  />
                </div>

                <div className="calc-field">
                  <div className="calc-field-header">
                    <span className="calc-label">Existing Monthly EMIs</span>
                    <span className="calc-val">₹{existingEmi}k /month</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="2" 
                    value={existingEmi} 
                    onChange={(e) => setExistingEmi(parseInt(e.target.value))}
                    className="range-slider"
                  />
                </div>

                <div className="calc-field">
                  <div className="calc-field-header">
                    <span className="calc-label">Expected Interest Rate (%)</span>
                    <span className="calc-val">{eligRate}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="7" 
                    max="12" 
                    step="0.1" 
                    value={eligRate} 
                    onChange={(e) => setEligRate(parseFloat(e.target.value))}
                    className="range-slider"
                  />
                </div>

                <div className="calc-field">
                  <div className="calc-field-header">
                    <span className="calc-label">Tenure (Years)</span>
                    <span className="calc-val">{eligTerm} Years</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="30" 
                    step="5" 
                    value={eligTerm} 
                    onChange={(e) => setEligTerm(parseInt(e.target.value))}
                    className="range-slider"
                  />
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="calc-results-card glass-card">
              <div className="calc-result-summary">
                <p>Maximum Eligible Loan Amount</p>
                <div className="calc-monthly-payment" style={{ fontSize: '2rem' }}>
                  ₹{(maxLoanEligible / 100000).toFixed(2)} Lakhs
                </div>
              </div>

              <div className="calc-breakdown">
                <div className="breakdown-row">
                  <div className="breakdown-label">
                    <span>Available EMI Capacity</span>
                  </div>
                  <div className="breakdown-val">₹{maxEmiAllowed.toLocaleString()} /mo</div>
                </div>

                <div className="breakdown-row">
                  <div className="breakdown-label">
                    <span>Estimated Property Budget</span>
                  </div>
                  <div className="breakdown-val" style={{ color: 'var(--primary)', fontWeight: '700' }}>
                    ~ {formatPrice(estimatedBudget)}
                  </div>
                </div>

                <div className="breakdown-row" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
                  <div className="breakdown-label">
                    <span>Required Down Payment (20%)</span>
                  </div>
                  <div className="breakdown-val">
                    {formatPrice(estimatedBudget * 0.2)}
                  </div>
                </div>
              </div>

              <a 
                href={`https://wa.me/917907878203?text=Hi,%20I%20ran%20the%20Eligibility%20Checker.%20My%20income%20is%20₹${monthlyIncome}k%20and%20max%20loan%20is%20₹${(maxLoanEligible / 100000).toFixed(2)}%20Lakhs.%20Please%20suggest%20villas%20under%20this%20budget.`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary" 
                style={{ marginTop: '2rem', width: '100%' }}
              >
                Apply for Pre-Approved Loan
              </a>
            </div>
          </div>
        )}

        {activeTab === 'roi' && (
          <div className="calculator-grid animate-fade-in">
            {/* Input Card */}
            <div className="calculator-card glass-card">
              <div className="calc-inputs">
                <div className="calc-field">
                  <div className="calc-field-header">
                    <span className="calc-label">Property Valuation / Cost</span>
                    <span className="calc-val">{formatPrice(roiBudget)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="300" 
                    step="5" 
                    value={roiBudget} 
                    onChange={(e) => setRoiBudget(parseInt(e.target.value))}
                    className="range-slider"
                  />
                </div>

                <div className="calc-field">
                  <div className="calc-field-header">
                    <span className="calc-label">Expected Monthly Rental</span>
                    <span className="calc-val">₹{roiRent}k /month</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="100" 
                    step="1" 
                    value={roiRent} 
                    onChange={(e) => setRoiRent(parseInt(e.target.value))}
                    className="range-slider"
                  />
                </div>

                <div className="calc-field">
                  <div className="calc-field-header">
                    <span className="calc-label">Annual Appreciation Rate (%)</span>
                    <span className="calc-val">{roiAppreciation}% /year</span>
                  </div>
                  <input 
                    type="range" 
                    min="3" 
                    max="15" 
                    step="0.5" 
                    value={roiAppreciation} 
                    onChange={(e) => setRoiAppreciation(parseFloat(e.target.value))}
                    className="range-slider"
                  />
                </div>

                <div className="calc-field">
                  <div className="calc-field-header">
                    <span className="calc-label">Holding Period (Years)</span>
                    <span className="calc-val">{roiYears} Years</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="15" 
                    step="1" 
                    value={roiYears} 
                    onChange={(e) => setRoiYears(parseInt(e.target.value))}
                    className="range-slider"
                  />
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="calc-results-card glass-card">
              <div className="calc-result-summary">
                <p>Net Investment ROI % ({roiYears} Years)</p>
                <div className="calc-monthly-payment" style={{ color: '#22c55e', fontSize: '2.5rem' }}>
                  {totalROI}%
                </div>
              </div>

              <div className="calc-breakdown">
                <div className="breakdown-row">
                  <div className="breakdown-label">
                    <span>Gross Annual Rental Yield</span>
                  </div>
                  <div className="breakdown-val" style={{ color: '#22c55e', fontWeight: '700' }}>
                    {rentalYield}%
                  </div>
                </div>

                <div className="breakdown-row">
                  <div className="breakdown-label">
                    <span>Projected Future Value</span>
                  </div>
                  <div className="breakdown-val">{formatPrice(futureValue)}</div>
                </div>

                <div className="breakdown-row" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
                  <div className="breakdown-label">
                    <span>Capital Appreciation Earned</span>
                  </div>
                  <div className="breakdown-val" style={{ color: 'var(--primary)', fontWeight: '700' }}>
                    + {formatPrice(appreciationValue)}
                  </div>
                </div>
              </div>

              <a 
                href={`https://wa.me/917907878203?text=Hi,%20I%20am%20an%20investor.%20I%20am%20looking%20for%20high%20rental%20yield%20villas%20around%20₹${roiBudget}%20Lakhs%20with%20good%20capital%20appreciation.`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary" 
                style={{ marginTop: '2rem', width: '100%' }}
              >
                Discuss High Yield Assets
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
