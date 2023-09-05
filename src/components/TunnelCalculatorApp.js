import React, { useState } from 'react';
import Input from './Input';

function TunnelCalculatorApp() {
  const [resultText, setResultText] = useState('');
  const [mi, setMi] = useState();
  const [σci, setσci] = useState();
  const [GSI, setGSI] = useState();
  const [γ, setγ] = useState();
  const [Actual_overburden, setActual_overburden] = useState();
  const [Pi, setPi] = useState();
  const [doValue, setdoValue] = useState();
  const [RMR, setRMR] = useState();
  const [Q, setQ] = useState();
  const [Rock_Density, setRock_Density] = useState();
  const [D, setD] = useState();
  // const [mb , setMb] = useState();


  const calculateParameters = () => {
    try {
      // Parse input values



      // Calculation logic ...  const mb = mi * Math.exp((GSI - 100) / (28 - 14 * D));
      const mb = mi * Math.exp((GSI - 100) / (28 - 14 * D))
      const s = Math.exp((GSI - 100) / (9 - 3 * D));
      const a = 0.5 + (1 / 6) * (Math.exp(-GSI / 15) - Math.exp(-20 / 3));

      // Calculate σcm using all five equations
      const σcm1 = (0.0034 * Math.pow(mi, 0.8)) * σci * Math.pow(1.029 + 0.025 * Math.exp(-0.1 * mi), GSI);
      const σcm2 = σci * Math.exp((RMR - 100) / 18.75);
      const σcm3 = (σci * (mi + 4 * s - a * (mb - 8 * s)) * Math.pow((mb / 4) + s, a - 1)) / (2 * (1 + a) * (2 + a));
      const σcm4 = 5 * Rock_Density * Math.pow((σci / 100) * Q, 1 / 3);
      const σcm5 = Math.pow(σci, 1.5) / 60;

      // Calculate the average value of σcm
      const σcm = (σcm1 + σcm2 + σcm3 + σcm4 + σcm5) / 5;

      const sigma_cm = σcm;
      const Po = γ * Actual_overburden;
      const ε_value = (0.002 - 0.0025 * Pi / Po) * Math.pow(sigma_cm / Po, 2.4 * Pi / Po - 2);
      const ε_percentage = ε_value * 100;

      // Calculate δi
      const δi = (ε_value / 100) * doValue;

      // Calculate H
      const H = 350 * Math.pow(Q, 1 / 3);

      // Classify based on ε
      let classification, support_type;

      if (ε_percentage < 1) {
        classification = "Generally No or few support problems";
        support_type = "Normal tunneling conditions, typically supported with rock bolts and shotcrete.";
      } else if (1 <= ε_percentage && ε_percentage <= 2.5) {
        classification = "Minor Squeezing Problems";
        support_type = "Rock bolts and shotcrete are typically used to solve this issue, but lattice girders or light steel sets may also be added for more safety.";
      } else if (2.5 < ε_percentage && ε_percentage <= 5) {
        classification = "Severe Squeezing Problems";
        support_type = "Immediate support installation is required. Heavy steel sets embedded in shotcrete are generally used.";
      } else if (5 < ε_percentage && ε_percentage <= 10) {
        classification = "Very Severe Squeezing Problems";
        support_type = "Face stability problem. Usually, fore poling and face reinforcement with steel sets embedded in shotcrete are required.";
      } else {
        classification = "Extreme Squeezing Problems";
        support_type = "Fore poling and face reinforcement is recommended, and yielding support also required in most cases.";
      }

      // Determine squeezing or non-squeezing
      const squeezing_status = H < Actual_overburden ? "Squeezing" : "Non-Squeezing";

      // Update the result text
      let newResultText = `Calculated σcm: ${sigma_cm.toFixed(2)} MPa\nCalculated Po: ${Po.toFixed(2)} MN/m3\nCalculated ε: ${ε_percentage.toFixed(2)}%`;
      newResultText += `\nSqueezing Status: ${squeezing_status}\nClassification: ${classification}\nSupport Type: ${support_type}`;
      setResultText(newResultText);
      

    } catch (error) {
      setResultText("Invalid input. Please enter valid numbers.");
    }
  };

  return (
    <div className='container'>
      <div className="secondcontainer">
      <form className=''>
        <h3>Tunnel Mechanics Calculator</h3>
        <div className='first'>
      <label  id=''>Mi:<Input value={mi} onChange={(e) => setMi(parseFloat(e.target.value))} placeholder={'Enter mi value'} className="form-control" /></label>
       <label id=''>Oci:<Input value={σci} onChange={(e) => setσci(parseFloat(e.target.value))} placeholder={'Enter value oci'} className="form-control" /></label>
       <label id=''>GSI:<Input value={GSI} onChange={(e) => setGSI(parseFloat(e.target.value))} placeholder={'Enter value GSI'} className="form-control" /></label>
        </div>
      <div className='second'>
       <label id=''>γ:<Input value={γ} onChange={(e) => setγ(parseFloat(e.target.value))} placeholder={'Enter value γ'} /></label>
       <label id=''>Overburden:<Input value={Actual_overburden} onChange={(e) => setActual_overburden(parseFloat(e.target.value))} className="form-control" placeholder={'Enter value Actual_overburden'} /></label>
       <label id=''>Pi:<Input value={Pi} onChange={(e) => setPi(parseFloat(e.target.value))} placeholder={'Enter value Pi'} className="form-control" /></label>
       </div>
       <div className='third'>
       <label id=''>doValue:<Input value={doValue} onChange={(e) => setRMR(parseFloat(e.target.value))} placeholder={'Enter value doValue'} className="form-control" /></label>
       <label id=''>RMR:<Input value={RMR} onChange={(e) => setRMR(parseFloat(e.target.value))} placeholder={'Enter value RMR'} className="form-control" /></label>
       <label id=''>Q:<Input value={Q} onChange={(e) => setQ(parseFloat(e.target.value))} placeholder={'Enter value Q'} className="form-control" /></label>
       </div>
       <div className='fourth'>
       <label id=''>Rock_Density:<Input value={Rock_Density} onChange={(e) => setRock_Density(parseFloat(e.target.value))} placeholder={'Enter RockDensity'} className="form-control" /></label>
       <label id=''>D:<Input value={D} onChange={(e) => setD(parseFloat(e.target.value))} placeholder={'Enter value D'} className="form-control" /></label>
       </div>
       <button type="button" className='btn btn-info' onClick={calculateParameters}>Calculate</button>
      </form>
      <div id="result_label">
        {resultText.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
          
        ))}
      </div>
      </div>
    </div>
  );
}

export default TunnelCalculatorApp;
