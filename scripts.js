document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark');
  }

  completeChecklist = () => {
    const completeRep = document.getElementById('completerep');
    const completeSerialNumbers = document.querySelectorAll('.completeserialnumber');
    const partsUsed = document.getElementById('partsused');
    const comments = document.querySelectorAll('.comments');
    const anyPercents = document.querySelectorAll('.anypercent');
    
    completeRep.outerHTML = `<span class="title">${completeRep.children[0].value}</span>`;
    
    completeSerialNumbers.forEach(serialNumber => {
      serialNumber.outerHTML = `<span class="title">${serialNumber.children[0].value}</span>`;
    });
    
    if (partsUsed.value !== '') {
      partsUsed.parentNode.classList.remove('hide');
    } else {
      partsUsed.parentNode.classList.add('hide');
    }
    
    comments.forEach(comment => {
      if (comment.value !== '') {
        comment.classList.remove('hide');
      } else {
        comment.classList.add('hide');
      }
    });
    
    anyPercents.forEach(percent => {
      if (percent.value !== '') {
        percent.parentNode.classList.remove('hide');
      } else {
        percent.parentNode.classList.add('hide');
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (e.target.id === 'printpage') {
      e.target.parentNode.classList.add('hide');
      window.addEventListener('afterprint', () => {
        e.target.parentNode.classList.remove('hide');
      });
      window.print();
    } else if (e.target.id === 'toggledarkmode') {
      document.body.classList.toggle('dark');
    } else if (e.target.id === 'completechecklist') {
      e.target.classList.add('hide');
      e.target.nextElementSibling.classList.remove('hide');
      completeChecklist();
    } else if (e.target.id === 'reloadpage') {
      location.reload();
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.matches('textarea')) {
      e.target.style.height = '';
      e.target.style.paddingBottom = '0';
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  });
  const finalizeChecklist = () => {
    const finalizeName = document.getElementById('finalizename');
    const finalizeAgreementType = document.getElementById('finalizeagreementtype');
    const finalizeRep = document.getElementById('finalizerep');
    const finalizeCloses = document.querySelectorAll('.finalizeclose');
    const finalizeEquipments = document.querySelectorAll('.finalizeequipment');
    const finalizeSerialNumbers = document.querySelectorAll('.finalizeserialnumber');
    const finalizeSpaces = document.querySelectorAll('.finalizespace');

    finalizeName.outerHTML = `<span class="title">${finalizeName.children[0].value}</span>`;
    finalizeAgreementType.outerHTML = `<span class="title">${finalizeAgreementType.children[0].value}</span>`;
    
    if (finalizeRep.children[0].value !== '') {
      finalizeRep.outerHTML = `<span class="title">${finalizeRep.children[0].value}</span>`;
    } else {
      finalizeRep.outerHTML = `<span id="completerep" class="title"><input id="inputrep" type="text"name="inputrep"></span>`;
    }

    finalizeCloses.forEach(close => {
      close.remove();
    });

    finalizeEquipments.forEach(equipment => {
      equipment.outerHTML = `<span class="title">${equipment.children[0].value}</span>`;
    });

    finalizeSerialNumbers.forEach(serialNumber => {
      if (serialNumber.children[0].value !== '') {
        serialNumber.outerHTML = `<span class="title">${serialNumber.children[0].value}</span>`;
      } else {
        serialNumber.outerHTML = `<span class="completeserialnumber title"><input class="inputserialnumber" type="text" name="inputserialnumber"></span>`;
      }
    });

    finalizeSpaces.forEach(space => {
      space.outerHTML = space.innerText;
    });
  }

  const downloadPage = () => {
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const finalizeMenu = document.getElementById('finalizemenu');
    const newMenu = document.createElement('ul');
    const newMenuContent = `  <ul>
    <li id="toggledarkmode" title="Toggle Dark Mode">ℳ</li>
    <li id="completechecklist" title="Complete Checklist">✓</li>
    <li id="reloadpage" class="hide" title="Reload Page (Keep Progress)">↻</li>
    <li id="printpage" title="Print Page (Save to PDF)">🖶</li>
  </ul>
  `;
    
    finalizeMenu.parentNode.appendChild(newMenu);
    newMenu.outerHTML = newMenuContent;
    finalizeMenu.remove();

    header.outerHTML = header.outerHTML.replace(/^\s*[\r\n]/gm, '');
    main.outerHTML = main.outerHTML.replace(/^\s*[\r\n]/gm, '');

    const finalizeLink = document.createElement('a');
    const finalizeTitle = document.querySelector('span');
    const finalizeContent = `<!DOCTYPE html>
  <html lang="en">
  <head>
  <title>${finalizeTitle.innerText}</title>
  ${document.head.children[1].outerHTML}
  <meta name="description" content="Please complete the checklist.">
  ${document.head.children[3].outerHTML}
  ${document.head.children[4].outerHTML}
  </head>
  <body>
  ${document.body.children[0].outerHTML}
  ${document.body.children[1].outerHTML}
  ${document.body.children[2].outerHTML}
  </body>
  </html>`;
    const finalizeBlob = new Blob([finalizeContent], { type: 'text/html' });

    finalizeLink.href = URL.createObjectURL(finalizeBlob);
    finalizeLink.download = `${finalizeTitle.innerText}.html`;
    document.body.appendChild(finalizeLink);
    finalizeLink.click();
    document.body.removeChild(finalizeLink);
    URL.revokeObjectURL(finalizeLink.href);
  }

  document.addEventListener('click', (e) => {
    const article = document.body.querySelector('article');

    if (e.target.id === 'gepm') {
      const gepmSection = document.createElement('section');
      const gepmContent = `  <section>
      <h1>PM: <span class="finalizeequipment title"><input class="inputequipment" type="text" name="inputequipment" placeholder="GE / Datex-Ohmeda"></span> SN: <span class="finalizeserialnumber title"><input class="inputserialnumber" type="text" name="inputserialnumber"></span></h1>
      <form>
        <ul>
          <li><input type="checkbox" name="frame"><label for="frame">Frame</label></li>
          <li><input type="checkbox" name="casters"><label for="casters">Casters</label></li>
          <li><input type="checkbox" name="brakes"><label for="brakes">Brakes</label></li>
          <li><input type="checkbox" name="drawers"><label for="drawers">Drawers</label></li>
          <li><input type="checkbox" name="switches"><label for="switches">Switches</label></li>
          <li><input type="checkbox" name="controls"><label for="controls">Controls</label></li>
          <li><input type="checkbox" name="seals-o-rings"><label for="seals-o-rings">Seals / O-Rings</label></li>
        </ul>
        <ul>
          <li><input type="checkbox" name="highpressureleak"><label for="highpressureleak">High Pressure Leak</label></li>
          <li><input type="checkbox" name="lowpressureleak"><label for="lowpressureleak">Low Pressure Leak</label></li>
          <li><input type="checkbox" name="commongasoutlet"><label for="commongasoutlet">Common Gas Outlet</label></li>
          <li><input type="checkbox" name="scavengingsystem"><label for="scavengingsystem">Scavenging System</label></li>
          <li><input type="checkbox" name="vaporizers"><label for="vaporizers">Vaporizers</label></li>
          <li><input type="checkbox" name="gasspecificsafety"><label for="gasspecificsafety">Gas Specific Safety</label></li>
          <li><input type="checkbox" name="pressureregulators"><label for="pressureregulators">Pressure Regulators</label></li>
          <li><input type="checkbox" name="proportioningsystem"><label for="proportioningsystem">Proportioning System</label></li>
        </ul>
        <ul>
          <li><input type="checkbox" name="componentinspections"><label for="componentinspections">Component Inspections</label></li>
          <li><input type="checkbox" name="adjustablepressurelimitvalve"><label for="adjustablepressurelimitvalve">Adjustable Pressure Limit Valve</label></li>
          <li>
            <input type="checkbox" name="peepvalve"><label for="peepvalve">Peep Valve</label>
            <input type="radio" name="peepvalveyesno"><label for="peepvalveyesno">Yes</label>
            <input type="radio" name="peepvalveyesno"><label for="peepvalveyesno">No</label>
          </li>
          <li><input type="checkbox" name="inh-exh-domesandvalves"><label for="inh-exh-domesandvalves">Inh. / Exh. Domes & Valves</label></li>
          <li><input type="checkbox" name="powerfailurealarms"><label for="powerfailurealarms">Power Failure Alarms</label></li>
          <li><input type="checkbox" name="systembatteries"><label for="systembatteries">System Batteries (24 Mo.)</label></li>
          <li><input type="checkbox" name="electricalsafety"><label for="electricalsafety">Electrical Safety (6 Mo.)</label></li>
        </ul>
      </form>
      <form>
        <ul>
          <li><input type="checkbox" name="pmptms"><label for="pmptms">Planned Maintenance Performed to Manufacturer's Specifications</label></li>
        </ul>
      </form>
      <textarea class="comments" name="comments" placeholder="Comments"></textarea>
      <p class="finalizeclose">^</p>
    </section>
  `;

      article.appendChild(gepmSection);
      gepmSection.outerHTML = gepmContent;
    } else if (e.target.id === 'drpm') {
      const drpmSection = document.createElement('section');
      const drpmContent = `  <section>
      <h1>PM: <span class="finalizeequipment title"><input class="inputequipment" type="text" name="inputequipment" placeholder="Drager"></span> SN: <span class="finalizeserialnumber title"><input class="inputserialnumber" type="text" name="inputserialnumber"></span></h1>
      <form>
        <ul>
          <li><input type="checkbox" name="frame"><label for="frame">Frame</label></li>
          <li><input type="checkbox" name="casters"><label for="casters">Casters</label></li>
          <li><input type="checkbox" name="brakes"><label for="brakes">Brakes</label></li>
          <li><input type="checkbox" name="drawers"><label for="drawers">Drawers</label></li>
          <li><input type="checkbox" name="switches"><label for="switches">Switches</label></li>
          <li><input type="checkbox" name="controls"><label for="controls">Controls</label></li>
          <li><input type="checkbox" name="seals-o-rings"><label for="seals-o-rings">Seals / O-Rings</label></li>
        </ul>
        <ul>
          <li><input type="checkbox" name="highpressureleak"><label for="highpressureleak">High Pressure Leak</label></li>
          <li><input type="checkbox" name="lowpressureleak"><label for="lowpressureleak">Low Pressure Leak</label></li>
          <li><input type="checkbox" name="oxygensupplyfailure"><label for="oxygensupplyfailure">Oxygen Supply Failure</label></li>
          <li><input type="checkbox" name="scavengingsystem"><label for="scavengingsystem">Scavenging System</label></li>
          <li><input type="checkbox" name="vaporizers"><label for="vaporizers">Vaporizers</label></li>
          <li><input type="checkbox" name="oxygenandvolumemonitor"><label for="oxygenandvolumemonitor">Oxygen & Volume Monitor</label></li>
          <li><input type="checkbox" name="pressureregulators"><label for="pressureregulators">Pressure Regulators</label></li>
          <li><input type="checkbox" name="proportioningsystem"><label for="proportioningsystem">Proportioning System</label></li>
          <li><input type="checkbox" name="gasinletregulator"><label for="gasinletregulator">Gas Inlet Regulator</label></li>
          <li><input type="checkbox" name="volume"><label for="volume">Volume</label></li>
          <li><input type="checkbox" name="vaporexclusion"><label for="vaporexclusion">Vapor Exclusion</label></li>
          <li><input type="checkbox" name="vacuumpressure"><label for="vacuumpressure">Vacuum Pressure</label></li>
        </ul>
        <ul>
          <li><input type="checkbox" name="componentinspections"><label for="componentinspections">Component Inspections</label></li>
          <li><input type="checkbox" name="adjustablepressurelimitvalve"><label for="adjustablepressurelimitvalve">Adjustable Pressure Limit Valve</label></li>
          <li>
            <input type="checkbox" name="peepvalve"><label for="peepvalve">Peep Valve</label>
            <input type="radio" name="peepvalveyesno"><label for="peepvalveyesno">Yes</label>
            <input type="radio" name="peepvalveyesno"><label for="peepvalveyesno">No</label>
          </li>
          <li><input type="checkbox" name="inh-exh-domesandvalves"><label for="inh-exh-domesandvalves">Inh. / Exh. Domes & Valves</label></li>
          <li><input type="checkbox" name="delivery-leak"><label for="delivery-leak">Delivery / Leak</label></li>
          <li><input type="checkbox" name="flowsensors"><label for="flowsensors">Flow Sensors</label></li>
          <li><input type="checkbox" name="powerfailurealarms"><label for="powerfailurealarms">Power Failure Alarms</label></li>
          <li><input type="checkbox" name="systembatteries"><label for="systembatteries">System Batteries (36 Mo.)</label></li>
          <li><input type="checkbox" name="electricalsafety"><label for="electricalsafety">Electrical Safety (6 Mo.)</label></li>
          <li><input type="checkbox" name="servicescreenconfiguration"><label for="servicescreenconfiguration">Service Screen Configuration</label></li>
          <li><input type="checkbox" name="resetdate"><label for="resetdate">Reset Date</label></li>
        </ul>
      </form>
      <textarea class="comments" name="comments" placeholder="Comments"></textarea>
      <p class="finalizeclose">^</p>
    </section>
  `;

      article.appendChild(drpmSection);
      drpmSection.outerHTML = drpmContent;
    } else if (e.target.id === 'vtpm') {
      const vtpmSection = document.createElement('section');
      const vtpmContent = `  <section>
      <h1>PM: <span class="finalizeequipment title"><input class="inputequipment" type="text" name="inputequipment" placeholder="Ventilator"></span> SN: <span class="finalizeserialnumber title"><input class="inputserialnumber" type="text" name="inputserialnumber"></span></h1>
      <form>
        <ul>
          <li><input type="checkbox" name="chassis"><label for="chassis">Chassis</label></li>
          <li><input type="checkbox" name="bellows"><label for="bellows">Bellows</label></li>
          <li><input type="checkbox" name="seals-o-rings"><label for="seals-o-rings">Seals / O-Rings</label></li>
        </ul>
        <ul>
          <li><input type="checkbox" name="batteries"><label for="batteries">Batteries</label></li>
          <li><input type="checkbox" name="componentinspection"><label for="componentinspection">Component Inspection</label></li>
          <li><input type="checkbox" name="bellowsservice"><label for="bellowsservice">Bellows Service</label></li>
          <li><input type="checkbox" name="oxygencalibration"><label for="oxygencalibration">Oxygen Calibration</label></li>
          <li><input type="checkbox" name="breathingsystemleak"><label for="breathingsystemleak">Breathing System Leak</label></li>
          <li><input type="checkbox" name="hosesandtubing"><label for="hosesandtubing">Hoses & Tubing</label></li>
          <li><input type="checkbox" name="flowdelivery"><label for="flowdelivery">Flow Delivery</label></li>
          <li><input type="checkbox" name="alarm"><label for="alarm">Alarm</label></li>
        </ul>
        <ul>
          <li><input type="checkbox" name="gasinletvalve"><label for="gasinletvalvese">Gas Inlet Valve</label></li>
          <li><input type="checkbox" name="exhalationvalve"><label for="exhalationvalve">Exh. Valve (24 Mo.)</label></li>
          <li><input type="checkbox" name="freebreathingvalve"><label for="freebreathingvalve">Free Breathing Valve (24 Mo.)</label></li>
          <li><input type="checkbox" name="batteries"><label for="batteries">Batteries (24 Mo.)</label></li>
          <li><input type="checkbox" name="diagnosticsoftware"><label for="diagnosticsoftware">Diagnostic Software</label></li>
          <li><input type="checkbox" name="electricalsafety"><label for="electricalsafety">Electrical Safety (6 Mo.)</label></li>
        </ul>
      </form>
      <textarea class="comments" name="comments" placeholder="Comments"></textarea>
      <p class="finalizeclose">^</p>
    </section>
  `;

      article.appendChild(vtpmSection);
      vtpmSection.outerHTML = vtpmContent;
    } else if (e.target.id === 'gnpm') {
      const gnpmSection = document.createElement('section');
      const gnpmContent = `  <section>
      <h1>PM: <span class="finalizeequipment title"><input class="inputequipment" type="text" name="inputequipment" placeholder="Generic"></span> SN: <span class="finalizeserialnumber title"><input class="inputserialnumber" type="text" name="inputserialnumber"></span></h1>
      <form>
        <ul>
          <li><input type="checkbox" name="pmptms"><label for="pmptms">Planned Maintenance Performed to Manufacturer's Specifications</label></li>
        </ul>
      </form>
      <textarea class="comments" name="comments" placeholder="Comments"></textarea>
      <p class="finalizeclose">^</p>
    </section>
  `;

      article.appendChild(gnpmSection);
      gnpmSection.outerHTML = gnpmContent;
    } else if (e.target.id === 'vca') {
      const vcaSection = document.createElement('section');
      const vcaContent = `  <section>
      <h1><span class="finalizespace">Vapor Concentration Analysis</span> SN: <span class="finalizeserialnumber title"><input class="inputserialnumber" type="text" name="inputserialnumber"></span></h1>
      <form>
        <ul>
          <li class="inline">
            <select name="type">
              <option value=""></option>
              <option value="tec5">Tec 5</option>
              <option value="tec6">Tec 6</option>
              <option value="tec6plus">Tec 6 Plus</option>
              <option value="tec7">Tec 7</option>
              <option value="tec850">Tec 850</option>
              <option value="vapor19.1">Vapor 19.1</option>
              <option value="vapor2000">Vapor 2000</option>
            </select>
          </li>
          <li class="inline">
            <select name="vaporizer">
              <option value=""></option>
              <option value="sevoflurane">Sevoflurane</option>
              <option value="isoflurane">Isoflurane</option>
              <option value="desflurane">Desflurane</option>
            </select>
          </li>
          <li class="inline"><input type="checkbox" name="onepercent"><label for="onepercent">1% Pass</label></li>
          <li class="inline"><input type="checkbox" name="threepercent"><label for="threepercent">3% Pass</label></li>
          <li class="inline"><input type="checkbox" name="fivepercent"><label for="fivepercent">5% Pass</label></li>
          <li class="inline"><input class="checkbox number" type="checkbox" name="anypercent"><input class="text anypercent" type="text" name="anypercent"><label class="number" for="anypercent">% Pass</label></li>
        </ul>
      </form>
      <textarea class="comments" name="comments" placeholder="Comments"></textarea>
      <p class="finalizeclose">^</p>
    </section>
  `;

      article.appendChild(vcaSection);
      vcaSection.outerHTML = vcaContent;
    } else if (e.target.id === 'wga') {
      const wgaSection = document.createElement('section');
      const wgaContent = `  <section>
      <h1>Waste Gas Analysis</h1>
      <form>
        <ul>
          <li><input class="datetime" type="time" name="nucdatetime"></li>
          <li><h2>Non-Use Conditions</h2></li>
          <li><input class="text" type="text" name="nucra"><label for="nucra">PPM Room Analysis</label></li>
          <li><input class="text" type="text" name="nucabz"><label for="nucabz">PPM Anesthetist Breathing Zone</label></li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li><input type="checkbox" name="nucnr"><label for="nucnr">NIOSH Recommendation of &le; 25PPM</label></li>
        </ul>
        <ul>
          <li><input class="datetime" type="time" name="sapdatetime"></li>
          <li><h2>Simulated / Actual Procedure</h2></li>
          <li><input class="text" type="text" name="sapra"><label for="sapra">PPM Room Analysis</label></li>
          <li><input class="text" type="text" name="sapabz"><label for="sapabz">PPM Anesthetist Breathing Zone</label></li>
          <li><input class="text" type="text" name="saptwa"><label for="saptwa">PPM Time Weighted Average</label></li>
          <li>&nbsp;</li>
          <li><input type="checkbox" name="sapnr"><label for="sapnr">NIOSH Recommendation of &le; 25PPM</label></li>
        </ul>
      </form>
      <textarea class="comments" name="comments" placeholder="Comments"></textarea>
      <p class="finalizeclose">^</p>
    </section>
  `;

      article.appendChild(wgaSection);
      wgaSection.outerHTML = wgaContent;
    } else if (e.target.id === 'aes') {
      const aesSection = document.createElement('section');
      const aesContent = `  <section>
      <h1>Air Exchange Survey</h1>
      <form>
        <input class="datetime" type="time" name="nucdatetime">
        <ul>
          <li><h2>Standard</h2></li>
          <li><input type="radio" name="standard"><label for="standard">AIA</label></li>
          <li><input type="radio" name="standard"><label for="standard">Facility</label></li>
        </ul>
        <ul>
          <li><h2>Method</h2></li>
          <li><input type="radio" name="method"><label for="method">Flowmeter</label></li>
          <li><input type="radio" name="method"><label for="method">Hood</label></li>
        </ul>
        <ul>
          <li><h2>Tested Using</h2></li>
          <li><input type="radio" name="testedusing"><label for="testedusing">Inlets</label></li>
          <li><input type="radio" name="testedusing"><label for="testedusing">Outlets</label></li>
        </ul>
        <ul>
          <li><h2>Room Pressure</h2></li>
          <li><input type="radio" name="roompressure"><label for="roompressure">Positive</label></li>
          <li><input type="radio" name="roompressure"><label for="roompressure">Negative</label></li>
        </ul>
        <ul class="block">
          <li><input class="text" type="text" name="reph"><label for="reph">Room Exchanges / Hour</label></li>
        </ul>
      </form>
      <textarea class="comments" name="comments" placeholder="Comments"></textarea>
      <p class="finalizeclose">^</p>
    </section>
  `;

      article.appendChild(aesSection);
      aesSection.outerHTML = aesContent;
    } else if (e.target.id === 'downloadpage') {
      downloadPage();
    } else if (e.target.id === 'finalizechecklist') {
      e.target.classList.add('hide');
      e.target.nextElementSibling.classList.remove('hide');
      finalizeChecklist();
    } else if (e.target.id === 'reloadpage') {
      location.reload();
    } else if (e.target.classList.contains('finalizeclose')) {
      e.target.parentNode.remove();
    }
  });
});