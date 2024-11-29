let width = 850,
  height = 600;

const svg = document.querySelector("#fullmap");
const g = document.querySelector("#MapGroup");
const h2head = document.querySelector(".headline .headHover h4");
const RedsZone = document.querySelectorAll("#RedsZone path")
const SesBesPath = document.querySelectorAll("#KESES g")
const Buttons = document.querySelector(".RZButton")
const water = document.querySelector("#Tambahan")

function spEnter() {
  h2head.style.transform = "translateX(0%)";
}
function spLeave() {
  h2head.style.transform = "translateX(-100%)";
}

// Path Bulungan
const elements = document.querySelectorAll("#path");

elements.forEach(function (element) {
  const titleEl = element.getAttribute("xlink:title");
  // create atrr d in path
  // onmouseover title
  element.addEventListener("mouseenter", function (e) {
    const tt = document.querySelector("#fullmap title");
    tt.innerHTML = titleEl;
    const azt = document.querySelectorAll("#cts");
    const etxl = e.target.getAttribute("xlink:title");

    azt.forEach((az) => {
      let at = az.getAttribute("data-vsx");
      if (etxl == at) {
        az.classList.add("az-active");
      } else {
        az.classList.remove("az-active");
      }
    });
  });
  element.addEventListener("mouseleave", function () {
    const azt = document.querySelectorAll("#cts");
    azt.forEach((az) => {
      az.classList.remove("az-active");
    });
  });
});

// current content
function currentContents() {
  const conHD = document.querySelector(".content-head h4");
  const myPolaris = document.querySelector("#myPolar");

  water.style.display = "unset"
  myPolaris.innerHTML = " ";
  conHD.innerHTML = "Kecamatan Samarinda Utara";
  Buttons.style.display = "none"
  RedsZone.forEach(RZcurr => {
    RZcurr.style.display = "none"
  })
  SesBesPath.forEach(SBPcurr => {
    SBPcurr.style.display = "none"
  })
  let fetchCurr = async () => {
    await fetch("/json/index.json")
      .then((Response) => Response.json())
      .then((data) => contents(data));
  };

  fetchCurr();

  function contents(data) {
    let divCont = document.createElement("tbody");
    const divTab = document.querySelector(".table-cts thead");
    divTab.innerHTML = `<tr>
                          <th class="cch0" rowspan="2"></th>
                          <th class="cch1" rowspan="2">Kelurahan</th>
                          <th class="cch2" rowspan="2">Total Kawasan</th>
                          <th class="cch3 cchs" colspan="3">Kesesuaian Lahan (ha)</th>
                        </tr>
                        <tr>
                          <th class="cch3">Sesuai</th>
                          <th class="cch3">Bersyarat</th>
                          <th class="cch3">Tidak Sesuai</th>
                        </tr>
                       `;
    data.map((datas) => {
      const ids = datas.ids;
      const indx = datas.indx;
      const lw = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(datas.lw);
      const A = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(datas.A);
      const B = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(datas.B);
      const C = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(datas.C);
      divCont.innerHTML += `
                              <tr id="${indx}" data-vsx="${datas.id}">
                                <td class="cc0" style="background-color:${datas.fill};"></td>
                                <td class="cc1">${ids}</td>
                                <td class="cc2">${lw}</td>
                                <td class="cc3">${A}</td>
                                <td class="cc3">${B}</td>
                                <td class="cc3">${C}</td>
                              </tr>
                              `;
    });
    const content = document.querySelector(".table-cts tbody");
    content.innerHTML = divCont.innerHTML;

    // Sec 2
    // SCND 1
    let scndHide = document.createElement("tbody");
    let scndHeadHide = document.createElement("tbody")
    scndHeadHide.innerHTML += `<tr>
                                  <th class="scnd1">Pola Ruang</th>
                                  <th class="scnd-sc">Luasan</th>
                              </tr>`;
    const tabScndHead = document.querySelector(".table-scnd-thead tbody");
    tabScndHead.innerHTML = scndHeadHide.innerHTML;


    data.map(datas => {
      let Pola = datas.nA;
            scndHide.innerHTML += `<tr>
                                        <td colspan="4" class="KecNom">${datas.id}</td>
                                    </tr>`
      Pola.forEach(indatas => {
        let Tkawa = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(indatas.Total)
        scndHide.innerHTML += `<tr>
                                    <td class="kws">${indatas.PolaRuang}</td>
                                    <td class="kws1">${Tkawa}</td>
                                </tr>
                                `
      });
      let SesTot = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(datas.A)
      scndHide.innerHTML+=`<tr>
                            <td class="tot-kws">Grand Total</td>
                            <td class="kws2">${SesTot}</td>
                          </tr>`
    })
    const tabScndBody = document.querySelector(".table-scnd-tbody tbody");
    tabScndBody.innerHTML = scndHide.innerHTML;

    // SCND 2
    let scndHide2 = document.createElement("tbody");
    let scndHeadHide2 = document.createElement("tbody")
    scndHeadHide2.innerHTML += `<tr>
                                  <th class="scnd1">Pola Ruang</th>
                                  <th class="scnd-sc">Luasan</th>
                              </tr>`;
    const tabScndHead2 = document.querySelector(".table-scnd-thead2 tbody");
    tabScndHead2.innerHTML = scndHeadHide2.innerHTML;


    data.map(datas => {
      let Pola2 = datas.nB;
            scndHide2.innerHTML += `<tr>
                                        <td colspan="4" class="KecNom">${datas.id}</td>
                                    </tr>`
      Pola2.forEach(indatas => {
        let Tkawa2 = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(indatas.Total)
        scndHide2.innerHTML += `<tr>
                                    <td class="kws">${indatas.PolaRuang}</td>
                                    <td class="kws1">${Tkawa2}</td>
                                </tr>
                                `
      });
      let SesTot = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(datas.B)
      scndHide2.innerHTML+=`<tr>
                            <td class="tot-kws">Grand Total</td>
                            <td class="kws2">${SesTot}</td>
                          </tr>`
    })
    const tabScndBody2 = document.querySelector(".table-scnd-tbody2 tbody");
    tabScndBody2.innerHTML = scndHide2.innerHTML;

    // SCND 3
    let scndHide3 = document.createElement("tbody");
    let scndHeadHide3 = document.createElement("tbody")
    scndHeadHide3.innerHTML += `<tr>
                                  <th class="scnd1">Pola Ruang</th>
                                  <th class="scnd-sc">Luasan</th>
                              </tr>`;
    const tabScndHead3 = document.querySelector(".table-scnd-thead3 tbody");
    tabScndHead3.innerHTML = scndHeadHide3.innerHTML;


    data.map(datas => {
      let Pola3 = datas.nC;
            scndHide3.innerHTML += `<tr>
                                        <td colspan="4" class="KecNom">${datas.id}</td>
                                    </tr>`
      Pola3.forEach(indatas => {
        let Tkawa3 = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(indatas.Total)
        scndHide3.innerHTML += `<tr>
                                    <td class="kws">${indatas.PolaRuang}</td>
                                    <td class="kws1">${Tkawa3}</td>
                                </tr>
                                `
      });
      let SesTot = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(datas.C)
      scndHide3.innerHTML+=`<tr>
                            <td class="tot-kws">Grand Total</td>
                            <td class="kws2">${SesTot}</td>
                          </tr>`
    })
    const tabScndBody3 = document.querySelector(".table-scnd-tbody3 tbody");
    tabScndBody3.innerHTML = scndHide3.innerHTML;

    // Chart
    const chartCurr = document.querySelector("#myPolar");
    chartCurr.innerHTML = "<canvas id='pieCurr'>_</canvas>";

    CobaPie()

    function CobaPie(){
      const myPie = document.getElementById("pieCurr").getContext("2d");
      const IDinPIE = data.map(datas=>{return datas.id})
      const fillingPIE = data.map(datas => {return datas.fill})
      let SUMinPIE = data.map(datas=>{return datas.lw})
      const SumOfPie = SUMinPIE.reduce((acc, curv) => {return acc + curv},0)
      const percentagePie = [];
      SUMinPIE.forEach(pc => {
        const res = pc/SumOfPie*100
        percentagePie.push(res)
        console.log(res)
      })
      console.log(percentagePie)
      new Chart(myPie, {
        type: "pie",
        data: {
          datasets: [
            {
              data: percentagePie,
              backgroundColor: fillingPIE
            }
          ],
          labels: IDinPIE,
        },
        options: {

        },
        plugins: [ChartDataLabels],
          options: {
            responsive: true,
            layout: {
              padding: 10
            },
            plugins: {
              legend: {
                display: false
              },
              datalabels: {
                color: "#FFFFFF",
                anchor: "end",
                align: "start",
                offset: -10,
                borderWidth: 2,
                borderColor: "#FFFFFF",
                borderRadius: 25,
                backgroundColor: (context) => {
                  return context.dataset.backgroundColor;
                },
                font: {
                  weight: "bold",
                  size: "10"
                },
                formatter: (value) => {
                  return value.toFixed(1) + " %"
                }
              }
            }
          }
      })
    }
  }
}

currentContents();

// current content

svg.addEventListener("click", function (e) {
  if (e.target.classList == "path") {
    // bounding client to zoom elements
    const bounds = e.target.getBBox();
    const padding = 5;
    const x0 = bounds.x - padding;
    const x1 = bounds.x + bounds.width + padding;
    const y0 = bounds.y - padding;
    const y1 = bounds.y + bounds.height + padding;
    const scale = 1 / Math.max((x1 - x0) / width, (y1 - y0) / height);

    g.setAttribute(
      "transform",
      "translate(" +
        width / 2 +
        "," +
        height / 2 +
        ") scale(" +
        scale +
        ") translate(" +
        -(x0 + x1) / 2 +
        "," +
        -(y0 + y1) / 2 +
        ")"
    );
    g.style.transition = "all " + (1 + scale / 10) + "s";

    // style looping non active

    elements.forEach(function (element) {
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      }
    });
    // style active
    e.target.classList.add("active");


    // Content data

    elements.forEach(function (contentOfElement) {
      if (e.target === contentOfElement) {
        let coeName = contentOfElement.getAttribute("xlink:title");
        // RedsZone

        Buttons.style.display = "unset"
        let RedZoneAll = document.querySelectorAll(".Red-Zone");
        let SesBesAll = document.querySelectorAll(".kesesuaian");
        RedZoneAll.forEach(RZRes => {
          if(RZRes.style.display == "unset"){
            RZRes.style.display = "none"
          }
        })
        RedZoneAll.forEach(RZL => {
          RZName = RZL.getAttribute("data-name");
          if (coeName == RZName){
            RZL.style.display = "unset";
          }
        })
        // SESUAI DAN BERSYARAT
        SesBesAll.forEach(SBRes => {
          if(SBRes.style.display == "unset"){
            SBRes.style.display = "none"
          }
        })
        SesBesAll.forEach(SBL => {
          SBName = SBL.getAttribute("data-name");
          if (coeName == SBName){
            SBL.style.display = "unset";
          }
        })






        // Stats data

        let fetching = async () => {
          await fetch("/json/index.json")
            .then((Response) => Response.json())
            .then((data) => mainContent(data));
        };

        fetching();

        function mainContent(data) {
          data.map((datas) => {
            if (coeName == datas.id) {
              let tabCoe = document.createElement("tbody");
              const divTabCoe = document.querySelector(".table-cts thead");
              divTabCoe.innerHTML = `<tr>
                          <th class="cch1">Kesesuaian</th>
                          <th class="cch2">Luas Lahan</th>
                          <th class="cch3">Persentase Lahan</th>
                          <th class="lbl">Label</th>
                        </tr>
                       `;
              const headname = document.querySelector(".content-head h4");
              headname.innerHTML = datas.id;
              const idsCoe = datas.ids;
              const indxCoe = datas.indx;
              const ctA = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(datas.A);
              const Aps = new Intl.NumberFormat("id-ID", { style: "percent", maximumFractionDigits: 2, }).format(datas.A / datas.lw);
              const ctB = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(datas.B);
              const Bps = new Intl.NumberFormat("id-ID", { style: "percent", maximumFractionDigits: 2, }).format(datas.B / datas.lw);
              const ctC = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(datas.C);
              const Cps = new Intl.NumberFormat("id-ID", { style: "percent", maximumFractionDigits: 2, }).format(datas.C / datas.lw);
              const SumKMTK = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format( datas.Kolam + datas.Minapadi + datas.Tambak + datas.Karamba );
              tabCoe.innerHTML += `
                              <tr>
                                <td class="cc1">Sesuai</td>
                                <td class="cc2">${ctA}</td>
                                <td class="cc3">${Aps}</td>
                                <td class="lbl" style="background-color:rgb(75, 192, 192)"></td>
                              </tr>
                              <tr>
                                <td class="cc1">Sesuai Bersyarat</td>
                                <td class="cc2">${ctB}</td>
                                <td class="cc3">${Bps}</td>
                                <td class="lbl" style="background-color:rgb(255, 205, 86)"></td>
                              </tr>
                              <tr>
                                <td class="cc1">Tidak Sesuai</td>
                                <td class="cc2">${ctC}</td>
                                <td class="cc3">${Cps}</td>
                                <td class="lbl" style="background-color:rgb(255, 99, 132)"></td>
                              </tr>
                              `;
              const content = document.querySelector(".table-cts tbody");
              content.innerHTML = tabCoe.innerHTML;
              // SEC2 bag 1
              let thbstart = document.querySelector(".th-tb-start")
              let thbend = document.querySelector(".th-tb-end")
              thbend.overflowY = "unset"
              let scndHeadClck = document.querySelector(".table-scnd-thead")
              scndHeadClck.innerHTML = `<tr>
                                          <th class="PL">Pola Ruang</th>
                                          <th class="LLP">Luasan</th>
                                        </tr>
                       `;
              let scndHiddenClck = document.createElement("tbody");
              let scndPotensi = datas.nA;
              scndPotensi.forEach(nandatas => {
                let Polas = nandatas.PolaRuang;
                console.log(Polas)
                let Totals = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2 }).format(nandatas.Total)
                scndHiddenClck.innerHTML += `
                                            <tr>
                                              <td class="bod-PL">${Polas}</td>
                                              <td class="bod-LLP1">${Totals}</td>
                                            </tr>
                                            `;
                                          })
                let GT = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2 }).format(datas.lw)
                scndHiddenClck.innerHTML += `
                                          <tr>
                                            <td class="tot-kws">Grand Total</td>
                                            <td class="kws2">${GT}</td>
                                          </tr>
                                          `;
                let scndBodyClck = document.querySelector(".table-scnd-tbody tbody");
                    scndBodyClck.innerHTML = scndHiddenClck.innerHTML;
              // SEC2 bag 2
              let thbstart2 = document.querySelector(".th-tb-start2")
              let thbend2 = document.querySelector(".th-tb-end2")
              thbend2.overflowY = "unset"
              let scndHeadClck2 = document.querySelector(".table-scnd-thead2")
              scndHeadClck2.innerHTML = `<tr>
                                          <th class="PL">Pola Ruang</th>
                                          <th class="LLP">Luasan</th>
                                        </tr>
                       `;
              let scndHiddenClck2 = document.createElement("tbody");
              let scndPotensi2 = datas.nB;
              scndPotensi2.forEach(nandatas => {
                let Polas2 = nandatas.PolaRuang;
                console.log(Polas2)
                let Totals2 = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2 }).format(nandatas.Total)
                scndHiddenClck2.innerHTML += `
                                            <tr>
                                              <td class="bod-PL">${Polas2}</td>
                                              <td class="bod-LLP1">${Totals2}</td>
                                            </tr>
                                            `;
                                          })
                let GT2 = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2 }).format(datas.lw)
                scndHiddenClck2.innerHTML += `
                                          <tr>
                                            <td class="tot-kws">Grand Total</td>
                                            <td class="kws2">${GT2}</td>
                                          </tr>
                                          `;
                let scndBodyClck2 = document.querySelector(".table-scnd-tbody2 tbody");
                    scndBodyClck2.innerHTML = scndHiddenClck2.innerHTML;
              // SEC2 Bag 3
              let thbstart3 = document.querySelector(".th-tb-start3")
              let thbend3 = document.querySelector(".th-tb-end3")
              thbend3.overflowY = "unset"
              let scndHeadClck3 = document.querySelector(".table-scnd-thead3")
              scndHeadClck3.innerHTML = `<tr>
                                          <th class="PL">Pola Ruang</th>
                                          <th class="LLP">Luasan</th>
                                        </tr>
                       `;
              let scndHiddenClck3 = document.createElement("tbody");
              let scndPotensi3 = datas.nC;
              scndPotensi3.forEach(nandatas => {
                let Polas3 = nandatas.PolaRuang;
                console.log(Polas3)
                let Totals3 = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2 }).format(nandatas.Total)
                scndHiddenClck3.innerHTML += `
                                            <tr>
                                              <td class="bod-PL">${Polas3}</td>
                                              <td class="bod-LLP1">${Totals3}</td>
                                            </tr>
                                            `;
                                          })
                let GT3 = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2 }).format(datas.lw)
                scndHiddenClck3.innerHTML += `
                                          <tr>
                                            <td class="tot-kws">Grand Total</td>
                                            <td class="kws2">${GT3}</td>
                                          </tr>
                                          `;
                let scndBodyClck3 = document.querySelector(".table-scnd-tbody3 tbody");
                    scndBodyClck3.innerHTML = scndHiddenClck3.innerHTML;
            }
          });
        }
      }
    });

    elements.forEach(function (corePolar) {
      if (e.target === corePolar) {
        let fetcher = async () => {
          await fetch("/json/index.json")
            .then((Response) => Response.json())
            .then((data) => PolarChart(data));
        };
        fetcher();
        const core = corePolar.getAttribute("xlink:title");
        function PolarChart(data) {
          data.map((datas) => {
            if (core == datas.id) {
              const myPolar = document.querySelector("#myPolar");
              myPolar.innerHTML = "<canvas id='myChart'>_</canvas>";

              return inPolars();
            }
            function inPolars() {
              const myChart = document.getElementById("myChart");
              const dtA = datas.A/datas.lw*100;
              const dtB = datas.B/datas.lw*100;
              const dtC = datas.C/datas.lw*100;
              const datanya = [dtA, dtB, dtC];
              new Chart(myChart, {
                type: "doughnut",
                data: {
                  labels: ["Sesuai", "Sesuai Bersyarat", "Tidak Sesuai"],
                  datasets: [
                    {
                      data: datanya,
                      backgroundColor: [
                        'rgb(75, 192, 192)',
                        'rgb(255, 205, 86)',
                        'rgb(255, 99, 132)'
                      ],
                    },
                  ],
                },
                options: {
          
                },
                plugins: [ChartDataLabels],
                  options: {
                    responsive: true,
                    layout: {
                      padding: 10
                    },
                    plugins: {
                      legend: {
                        display: false
                      },
                      datalabels: {
                        color: "#FFFFFF",
                        anchor: "end",
                        align: "start",
                        offset: -10,
                        borderWidth: 2,
                        borderColor: "#FFFFFF",
                        borderRadius: 25,
                        backgroundColor: (context) => {
                          return context.dataset.backgroundColor;
                        },
                        font: {
                          weight: "bold",
                          size: "10"
                        },
                        formatter: (value) => {
                          return value.toFixed(1) + " %"
                        }
                      }
                    }
                  }
              });
            }
          });
        }
      }
    });
    // event click to change content
  } else {
    // another click
    g.setAttribute("transform", "translate(0, 0) scale(1)");
    elements.forEach(function (element) {
      element.classList.remove("active");
      // let c1Title = document.querySelector(".c1-head h3");
      // c1Title.innerHTML = "Kabupaten Bulungan";
    });
    return currentContents();
  }
});

function RZButton(){
  let RZon = document.querySelector("#RedsZone");
  let SBon = document.querySelector("#KESES");
  if(RZon.style.display === "none"){
    RZon.style.display = "unset"
    SBon.style.display = "none"
    water.style.display = "none"
  }else{
    RZon.style.display = "none"
    water.style.display = "unset"
  }
}

function SBButton(){
  let SBon = document.querySelector("#KESES");
  let RZon = document.querySelector("#RedsZone");
  if(SBon.style.display === "none"){
    SBon.style.display = "unset"
    RZon.style.display = "none"
    water.style.display = "none"
  }else{
    SBon.style.display = "none"
    water.style.display = "unset"
  }
}
