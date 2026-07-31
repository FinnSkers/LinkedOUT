import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2,
  TrendingDown
} from 'lucide-react';

export default function BdTaxCalculator() {
  const [monthlyGrossSalary, setMonthlyGrossSalary] = useState(100000);
  const [festivalBonusesCount, setFestivalBonusesCount] = useState(2);
  const [pfContributionPercent, setPfContributionPercent] = useState(5);

  // NBR Bangladesh Income Tax Calculation (General Tax Slabs FY 2024-25)
  // First 350,000 BDT: 0%
  // Next 100,000 BDT: 5%
  // Next 300,000 BDT: 10%
  // Next 400,000 BDT: 15%
  // Next 500,000 BDT: 20%
  // Remaining: 25%

  const annualGrossBDT = (monthlyGrossSalary * 12) + (monthlyGrossSalary * festivalBonusesCount);
  const annualPFDeduction = (monthlyGrossSalary * 12 * (pfContributionPercent / 100));
  
  // Taxable income estimate (1/3 of total or 450,000 BDT exempted allowance per NBR rule)
  const taxableIncome = Math.max(0, annualGrossBDT - Math.min(annualGrossBDT * 0.33, 450000) - annualPFDeduction);

  const calculateAnnualTax = (income) => {
    let tax = 0;
    let rem = income;

    // Slab 1: 350,000 @ 0%
    rem = Math.max(0, rem - 350000);
    
    // Slab 2: 100,000 @ 5%
    const s2 = Math.min(rem, 100000);
    tax += s2 * 0.05;
    rem = Math.max(0, rem - s2);

    // Slab 3: 300,000 @ 10%
    const s3 = Math.min(rem, 300000);
    tax += s3 * 0.10;
    rem = Math.max(0, rem - s3);

    // Slab 4: 400,000 @ 15%
    const s4 = Math.min(rem, 400000);
    tax += s4 * 0.15;
    rem = Math.max(0, rem - s4);

    // Slab 5: 500,000 @ 20%
    const s5 = Math.min(rem, 500000);
    tax += s5 * 0.20;
    rem = Math.max(0, rem - s5);

    // Slab 6: Above @ 25%
    if (rem > 0) {
      tax += rem * 0.25;
    }

    return Math.round(tax);
  };

  const annualTaxBDT = calculateAnnualTax(taxableIncome);
  const monthlyTaxBDT = Math.round(annualTaxBDT / 12);
  const monthlyPFBDT = Math.round(monthlyGrossSalary * (pfContributionPercent / 100));
  const netMonthlyTakeHomeBDT = monthlyGrossSalary - monthlyTaxBDT - monthlyPFBDT;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border-emerald-500/30 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black font-mono uppercase tracking-wider">
          <Calculator className="w-4 h-4 text-emerald-400" />
          <span>BANGLADESH INCOME TAX & TAKE-HOME CALCULATOR (NBR SLABS)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Net Monthly <span className="text-gradient-cyan">Take-Home Pay in BDT (৳)</span>
        </h2>
        <p className="text-slate-300 text-sm font-medium">
          Calculate your exact net monthly salary after NBR income tax slabs and Provident Fund (PF) deductions in BD.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Form Inputs */}
        <div className="glow-card rounded-3xl p-6 space-y-5 bg-slate-900/90 border-white/10">
          <h3 className="text-base font-extrabold text-white pb-2 border-b border-white/10">
            Salary Parameters (৳ BDT)
          </h3>

          <div className="space-y-4 text-xs font-bold">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Gross Monthly Salary</span>
                <span className="text-emerald-400 font-mono font-black">৳ {monthlyGrossSalary.toLocaleString()}/mo</span>
              </div>
              <input
                type="range"
                min={30000}
                max={500000}
                step={5000}
                value={monthlyGrossSalary}
                onChange={(e) => setMonthlyGrossSalary(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Festival / Eid Bonuses Per Year</span>
                <span className="text-amber-400 font-mono font-black">{festivalBonusesCount} bonuses</span>
              </div>
              <select
                value={festivalBonusesCount}
                onChange={(e) => setFestivalBonusesCount(Number(e.target.value))}
                className="input-field text-xs py-2 px-3 rounded-xl"
              >
                <option value={0}>0 (No Eid Bonus)</option>
                <option value={1}>1 Festival Bonus</option>
                <option value={2}>2 Festival Bonuses (Standard)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Provident Fund (PF) Contribution</span>
                <span className="text-cyan-400 font-mono font-black">{pfContributionPercent}%</span>
              </div>
              <select
                value={pfContributionPercent}
                onChange={(e) => setPfContributionPercent(Number(e.target.value))}
                className="input-field text-xs py-2 px-3 rounded-xl"
              >
                <option value={0}>0% (No Provident Fund)</option>
                <option value={5}>5% PF Contribution</option>
                <option value={10}>10% PF Contribution (Standard)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="glow-card rounded-3xl p-6 space-y-6 bg-slate-900/90 border-emerald-500/30 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase font-black">YOUR MONTHLY TAKE-HOME BREAKDOWN</span>

            <div className="mt-4 space-y-4">
              
              <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/40 text-center">
                <span className="text-xs text-slate-400 block font-bold">Estimated Net Take-Home Pay</span>
                <span className="text-3xl sm:text-4xl font-black font-mono text-emerald-400">
                  ৳ {netMonthlyTakeHomeBDT.toLocaleString()}<span className="text-xs text-slate-400">/month</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center font-mono">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Monthly NBR Tax</span>
                  <span className="text-base font-extrabold text-[#ff0055]">৳ {monthlyTaxBDT.toLocaleString()}</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Monthly PF Savings</span>
                  <span className="text-base font-extrabold text-cyan-400">৳ {monthlyPFBDT.toLocaleString()}</span>
                </div>
              </div>

            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Calculated using NBR Bangladesh General Tax Slabs (FY 2024-25).</span>
          </div>
        </div>

      </div>

    </div>
  );
}
