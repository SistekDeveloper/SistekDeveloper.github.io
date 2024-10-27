let width = 725,
  height = 550;

const svg = document.querySelector("#fullmap");
const g = document.querySelector("#MapGroup");
const h2head = document.querySelector(".headline .headHover h4");
const RedsZone = document.querySelectorAll("#RedsZone path")
const SesBesPath = document.querySelectorAll("#KESES g")
const Buttons = document.querySelector(".RZButton")
const water = document.querySelector(".water")

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
  conHD.innerHTML = "Kabupaten Bulungan";
  Buttons.style.display = "none"
  RedsZone.forEach(RZcurr => {
    RZcurr.style.display = "none"
  })
  SesBesPath.forEach(SBPcurr => {
    SBPcurr.style.display = "none"
  })
  let fetchCurr = async () => {
    await fetch("/json/data.json")
      .then((Response) => Response.json())
      .then((data) => contents(data));
  };

  fetchCurr();

  function contents(data) {
    let divCont = document.createElement("tbody");
    const divTab = document.querySelector(".table-cts thead");
    divTab.innerHTML = `<tr>
                          <th class="cch0"></th>
                          <th class="cch1">Kecamatan</th>
                          <th class="cch2">Total Kawasan</th>
                          <th class="cch3">Kawasan Potensi</th>
                        </tr>
                       `;
    data.map((datas) => {
      const ids = datas.ids;
      const indx = datas.indx;
      const GT = new Intl.NumberFormat("id-ID", {
        style: "decimal",
        maximumFractionDigits: 2,
      }).format(datas.GrandTotal);
      const SUM = new Intl.NumberFormat("id-ID", {
        style: "decimal",
        maximumFractionDigits: 2,
      }).format(datas.SUM);
      divCont.innerHTML += `
                              <tr id="${indx}" data-vsx="${datas.id}">
                                <td class="cc0" style="background-color:${datas.fill};"></td>
                                <td class="cc1">${ids}</td>
                                <td class="cc2">${GT}</td>
                                <td class="cc3">${SUM}</td>
                              </tr>
                              `;
    });
    const content = document.querySelector(".table-cts tbody");
    content.innerHTML = divCont.innerHTML;

    // Sec 2
    let scndHide = document.createElement("tbody");
    let scndHeadHide = document.createElement("tbody")
    scndHeadHide.innerHTML += `<tr>
                                  <th class="scnd1" rowspan="2">Kawasan Lahan Perikanan</th>
                                  <th class="scnd-sc" colspan="3">Luas Kawasan</th>
                                  <th class="scnd4" rowspan="2">Total</th>
                              </tr>
                              <tr>
                                  <th class="scnd2">Sesuai</th>
                                  <th class="scnd3">Sesuai Bersyarat</th>
                              </tr>`;
    const tabScndHead = document.querySelector(".table-scnd-thead tbody");
    tabScndHead.innerHTML = scndHeadHide.innerHTML;


    data.map(datas => {
      let potensiSB = datas.potensionSB;
            scndHide.innerHTML += `<tr>
                                        <td colspan="4" class="KecNom">${datas.id}</td>
                                    </tr>`
      potensiSB.forEach(indatas => {
        let Ses = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(indatas.Sesuai)
        let SesBes = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(indatas.SesuaiBersyarat)
        let GraTot = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(indatas.GrandTotal)
        scndHide.innerHTML += `<tr>
                                    <td class="kws">${indatas.Kawasan}</td>
                                    <td class="kws1">${Ses}</td>
                                    <td class="kws1">${SesBes}</td>
                                    <td class="kws1">${GraTot}</td>
                                </tr>
                                `
      });
      let SesTot = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(datas.Sesuai)
      let SesBesTot = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(datas.SesuaiBersyarat)
      let GarToTot = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2, }).format(datas.GrandTotal)
      scndHide.innerHTML+=`<tr>
                            <td class="tot-kws">Grand Total</td>
                            <td class="kws2">${SesTot}</td>
                            <td class="kws2">${SesBesTot}</td>
                            <td class="kws2">${GarToTot}</td>
                          </tr>`
    })
    const tabScndBody = document.querySelector(".table-scnd-tbody tbody");
    tabScndBody.innerHTML = scndHide.innerHTML;
    const chartCurr = document.querySelector("#myPolar");
    chartCurr.innerHTML = "<canvas id='pieCurr'>_</canvas>";

    CobaPie()

    function CobaPie(){
      const myPie = document.getElementById("pieCurr").getContext("2d");
      const IDinPIE = data.map(datas=>{return datas.id})
      const SUMinPIE = data.map(datas=>{return datas.SUM})
      const fillingPIE = data.map(datas => {return datas.fill})
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
    const padding = 25;
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
          await fetch("/json/data.json")
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
                          <th class="cch1">Jenis Usaha</th>
                          <th class="cch2">Luas Lahan</th>
                          <th class="cch3">Persentase Lahan</th>
                          <th class="lbl">Label</th>
                        </tr>
                       `;
              const headname = document.querySelector(".content-head h4");
              headname.innerHTML = datas.id;
              const idsCoe = datas.ids;
              const indxCoe = datas.indx;
              const Kolam = new Intl.NumberFormat("id-ID", {
                style: "decimal",
                maximumFractionDigits: 2,
              }).format(datas.Kolam);
              const PLKolam = new Intl.NumberFormat("id-ID", {
                style: "percent",
                maximumFractionDigits: 2,
              }).format(datas.Kolam / datas.SUM);
              const Minapadi = new Intl.NumberFormat("id-ID", {
                style: "decimal",
                maximumFractionDigits: 2,
              }).format(datas.Minapadi);
              const PLMinapadi = new Intl.NumberFormat("id-ID", {
                style: "percent",
                maximumFractionDigits: 2,
              }).format(datas.Minapadi / datas.SUM);
              const Tambak = new Intl.NumberFormat("id-ID", {
                style: "decimal",
                maximumFractionDigits: 2,
              }).format(datas.Tambak);
              const PLTambak = new Intl.NumberFormat("id-ID", {
                style: "percent",
                maximumFractionDigits: 2,
              }).format(datas.Tambak / datas.SUM);
              const Karamba = new Intl.NumberFormat("id-ID", {
                style: "decimal",
                maximumFractionDigits: 2,
              }).format(datas.Karamba);
              const PLKaramba = new Intl.NumberFormat("id-ID", {
                style: "percent",
                maximumFractionDigits: 2,
              }).format(datas.Karamba / datas.SUM);
              const SumKMTK = new Intl.NumberFormat("id-ID", {
                style: "decimal",
                maximumFractionDigits: 2,
              }).format(
                datas.Kolam + datas.Minapadi + datas.Tambak + datas.Karamba
              );
              tabCoe.innerHTML += `
                              <tr>
                                <td class="cc1">Kolam</td>
                                <td class="cc2">${Kolam}</td>
                                <td class="cc3">${PLKolam}</td>
                                <td class="lbl" style="background-color:rgb(75, 192, 192)"></td>
                              </tr>
                              <tr>
                                <td class="cc1">Minapadi</td>
                                <td class="cc2">${Minapadi}</td>
                                <td class="cc3">${PLMinapadi}</td>
                                <td class="lbl" style="background-color:rgb(255, 205, 86)"></td>
                              </tr>
                              <tr>
                                <td class="cc1">Karamba</td>
                                <td class="cc2">${Karamba}</td>
                                <td class="cc3">${PLKaramba}</td>
                                <td class="lbl" style="background-color:rgb(54, 162, 235)"></td>
                              </tr>
                              <tr>
                                <td class="cc1">Tambak</td>
                                <td class="cc2">${Tambak}</td>
                                <td class="cc3">${PLTambak}</td>
                                <td class="lbl" style="background-color:rgb(255, 99, 132)"></td>
                              </tr>
                              `;
              const content = document.querySelector(".table-cts tbody");
              content.innerHTML = tabCoe.innerHTML;
              // SEC2
              let thbstart = document.querySelector(".th-tb-start")
              thbstart.height = "20%"
              let thbend = document.querySelector(".th-tb-end")
              thbend.height = "80%"
              thbend.overflowY = "unset"
              let scndHeadClck = document.querySelector(".table-scnd-thead")
              scndHeadClck.innerHTML = `<tr>
                                          <th class="PL" rowspan="2">Potensi Lahan</th>
                                          <th class="LLP" colspan="2">Luas Lahan Potensi</th>
                                          <th class="PU" rowspan="2">Potensi Usaha</th>
                                          <th class="LU" colspan="3">Luasan Usaha Yang Direkomendasikan</th>
                                        </tr>
                                        <tr>
                                          <th class="LLP1">Sesuai</th>
                                          <th class="LLP2">Sesuai Bersyarat</th>
                                          <th class="LU1">Sesuai</th>
                                          <th class="LU2">Sesuai Bersyarat</th>
                                          <th class="LU3">Total</th>
                                        </tr>
                       `;
              let scndHiddenClck = document.createElement("tbody");
              let scndPotensi = datas.potension;
              scndPotensi.forEach(nandatas => {
                let pts = nandatas.Potensi;
                let SesLLP = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2 }).format(nandatas.Sesuai)
                let SesBesLLP = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2 }).format(nandatas.Bersyarat)
                let Us = nandatas.Usaha
                let SesLU = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2 }).format(nandatas.Sesuai2)
                let SesBesLU = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2 }).format(nandatas.Bersyarat2)
                let TotLU = new Intl.NumberFormat("id-ID", { style: "decimal", maximumFractionDigits: 2 }).format(nandatas.Totaly);
                scndHiddenClck.innerHTML += `
                                            <tr>
                                              <td class="bod-PL">${pts}</td>
                                              <td class="bod-LLP1">${SesLLP}</td>
                                              <td class="bod-LLP2">${SesBesLLP}</td>
                                              <td class="bod-PU">${Us}</td>
                                              <td class="bod-LU1">${SesLU}</td>
                                              <td class="bod-LU2">${SesBesLU}</td>
                                              <td class="bod-LU3">${TotLU}</td>
                                            </tr>
                                            `;
                let scndBodyClck = document.querySelector(".table-scnd-tbody tbody");
                scndBodyClck.innerHTML = scndHiddenClck.innerHTML;
              })
            }
          });
        }
      }
    });

    elements.forEach(function (corePolar) {
      if (e.target === corePolar) {
        let fetcher = async () => {
          await fetch("/json/data.json")
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
              const dtKolam = datas.Kolam/datas.SUM*100;
              const dtMinapadi = datas.Minapadi/datas.SUM*100;
              const dtKaramba = datas.Karamba/datas.SUM*100;
              const dtTambak = datas.Tambak/datas.SUM*100;
              const datanya = [dtKolam, dtMinapadi, dtKaramba, dtTambak];
              new Chart(myChart, {
                type: "doughnut",
                data: {
                  labels: ["Kolam", "Minapadi", "Karamba", "Tambak"],
                  datasets: [
                    {
                      data: datanya,
                      backgroundColor: [
                        'rgb(75, 192, 192)',
                        'rgb(255, 205, 86)',
                        'rgb(54, 162, 235)',
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
