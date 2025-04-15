import pdf from "html-pdf";
import QuickChart from "quickchart-js";
import StudentAssignment from "../model/studentAssignment.js";
import User from "../model/userModel.js";

// export const chart = async (req, res) => {
//   console.log(req.query );
//   let { subject, assignmentid, stdid, view } = req.query;
//   let selectedClass = req.query.class;
//   let found = await StudentAssignment.find()
//     .populate({ path: "student", model: "User" })
//     .populate({ path: "assignment", model: "Assignment" });
//   let arr = [];
//   let chartLabel = [];
//   let chartData = [];
//   let dataForTable = [];
//   if (
//     ((stdid != undefined || stdid != "undefined") && stdid != "") &&
//     (assignmentid == undefined || assignmentid == "undefined") &&
//     (selectedClass == undefined || assignmentid == "undefined")&&
//    ( subject == undefined|| subject == "undefined")
//   ) {
//     // console.log();
//     let foundStd = await User.findById(stdid);
//     if (!foundStd)
//       return res.status(400).json({ message: "Student not found" });
//     found.map((item) => {
//       if (item.student._id == stdid) {
//         arr.push(item);
//       }
//     });
//   }
//   if (
//     ((subject != undefined || subject != "undefined") && subject != "")&&
//    ( assignmentid == undefined|| subject != "undefined") &&
//    ( selectedClass == undefined || selectedClass == "undefined") &&
//    ( stdid == undefined|| selectedClass == "undefined")
//   ) {
//     found.map((item) => {
//       if (item.assignment.subject?.toLowerCase() == subject?.toLowerCase()) {
//         arr.push(item);
//       }
//     });
//   }
//   if (
//    ( selectedClass != undefined|| selectedClass != "undefined") &&
//    ( subject == undefined||subject == "undefined") &&
//     (assignmentid == undefined|| assignmentid == "undefined") &&
//     (stdid == undefined|| stdid == "undefined")
//   ) {
//     found.map((item) => {
//       if (item.assignment.class == selectedClass) {
//         arr.push(item);
//       }
//     });
//   }
//   if (
//     ( selectedClass == undefined|| selectedClass == "undefined") &&
//     ( subject == undefined||subject == "undefined") &&
//      (assignmentid != undefined|| assignmentid != "undefined") &&
//      (stdid == undefined|| stdid == "undefined")
//     // selectedClass == undefined &&
//     // subject == undefined &&
//     // assignmentid != undefined &&
//     // stdid == undefined
//   ) {
//     found.map((item) => {
//       if (item.assignment._id == assignmentid) {
//         arr.push(item);
//       }
//     });
//   }
//   if (
//     ( selectedClass == undefined|| selectedClass == "undefined") &&
//     ( subject != undefined||subject != "undefined") &&
//      (assignmentid != undefined|| assignmentid != "undefined") &&
//      (stdid == undefined|| stdid == "undefined")
//     // subject != undefined &&
//     // assignmentid != undefined &&
//     // selectedClass == undefined &&
//     // stdid == undefined
//   ) {
//     found.map((item) => {
//       if (
//         item.assignment.subject?.toLowerCase() == subject?.toLowerCase() &&
//         item.assignment._id == assignmentid
//       ) {
//         arr.push(item);
//       }
      
//     });
//   }
//   if (
//     ( selectedClass != undefined|| selectedClass == "undefined") &&
//     ( subject != undefined||subject != "undefined") &&
//      (assignmentid != undefined|| assignmentid != "undefined") &&
//      (stdid == undefined|| stdid == "undefined")
//     // subject != undefined &&
//     // assignmentid != undefined &&
//     // selectedClass != undefined &&
//     // stdid == undefined
//   ) {
//     found.map((item) => {
//       if (
//         item.assignment.subject?.toLowerCase() == subject?.toLowerCase() &&
//         item.assignment._id == assignmentid &&
//         item.assignment.class == selectedClass
//       ) {
//         // console.log(item);
//         arr.push(item);
//       }
//     });
//   }
//   console.log(req.query);
//   if (
//     (( selectedClass == undefined|| selectedClass == "undefined") || selectedClass == "") &&
//     (( subject == undefined||subject == "undefined") || subject == "" )&&
//     ((assignmentid == undefined|| assignmentid == "undefined") || assignmentid == "") &&
//     ((stdid == undefined|| stdid == "undefined") || stdid == "" )
//   ) {
//     console.log("mass");
//     arr = found;
//   }
//   arr.map((item) => {
//     chartLabel.push(
//       item.student.name +
//         "/" +
//         item.assignment.assignmentTitle +
//         "/" +
//         item.assignment.subject
//     );
//     dataForTable.push({
//       name: item.student.name,
//       class: item.student.class,
//       assignmentName: item.assignment.assignmentTitle,
//       subject: item.assignment.subject,
//       scoredMarks: item.answers?.length == 0 ? "Not attend" : item.scoredMarks,
//     });
//     chartData.push(item.scoredMarks);
//   });
//   if (dataForTable.length == 0)
//     return res.status(400).json({ message: "No data found" });
//   const myChart = new QuickChart();
//   myChart
//     .setConfig({
//       type: "bar",
//       data: {
//         labels: chartLabel,
//         datasets: [
//           {
//             label: "Student Marks",
//             data: chartData,
//             backgroundColor: "#8f32a8",
//           },
//         ],
//       },
//     })
//     .setWidth(500)
//     .setHeight(280);
//   const chartImageUrl = myChart.getUrl();
//   console.log(chartImageUrl);
  
//   // var download = function(uri, filename, callback){
//   //   request.head(uri, function(err, res, body){
//   //     console.log("content-type:", res.headers["content-type"]);
//   //     console.log("content-length:", res.headers["content-length"]);
//   //     request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
//   //   });
//   // };
//   // download(chartImageUrl, `chart${Date.now()}.png`, function(){
//   //   console.log("done");
//   // });
//   let table = "";
//   table += "<div style='heigth:100%'>";
//   table += "<h1 style='text-align:center'> Students Report </h1>";
//   table += "<img src=" + chartImageUrl + "style='margin-bottom:30px;width:900px;height:300px' >";
//   table += "<h1 style='text-align:center'>Student Marks</h1>";
//   table += "<table border='1' style='width:95%;margin-left:2%;word-break:break-word;background-color:white'>";
//   table += "<tr style='background-color:#8f32a8;color:white' >";
//   table += "<th style='font-size:24px;max-width:150px;padding:10px'>Student Name</th>";
//   table += "<th style='font-size:24px;max-width:150px;padding:10px'>Student Class</th>";
//   table += "<th style='font-size:24px;max-width:150px;padding:10px'>Assignment Name</th>";
//   table += "<th style='font-size:24px;max-width:150px;padding:10px'>Subject</th>";
//   table += "<th style='font-size:24px;max-width:150px;padding:10px'>Student Mark</th>";
//   table += "</tr>";
//   dataForTable.forEach(function (tableData) {
//     table += "<tr >";
//     table += "<td style='font-size:20px;max-width:150px;padding:10px'>" +tableData.name +"</td>";
//     table += "<td style='font-size:20px;max-width:150px;padding:10px'>" +tableData.class +"</td>";
//     table += "<td style='font-size:20px;max-width:150px;padding:10px'>" +tableData.assignmentName +"</td>";
//     table += "<td style='font-size:20px;max-width:150px;padding:10px'>" +tableData.subject +"</td>";
//     table += "<td style='font-size:20px;max-width:150px;padding:10px'>" +tableData.scoredMarks +"</td>";
//     table += "</tr>";
//   });
//   table += "</table>";
//   table += "</div>";
//   var options = {
//     format: "A4",
//     orientation: "landscape",
//     border: {
//       top: "0.1in",
//       left: "0.2in",
//     },
//     timeout: "120000",
//   };
//   console.log(req.query);
//   console.log(req.query.view );
//   if( view == "true" &&  view != "false"){
//     console.log("mass");
//     return res.status(200).json({data:{chartImg:chartImageUrl,tableData:dataForTable}})
//   }
//   // let pdfFileName = `chartAndTable${Date.now()}.pdf`;
//   let pdfFileName = `tickets.pdf`;
//   pdf.create(table, options).toFile(pdfFileName, function (err, result) {
//     if (err) return console.log({ message: err });
//     if (result){
//       res.download(result.filename);
//     }
//   });
// };



export const chart = async (req, res) => {
  let { subject, assignmentid, stdid ,view} = req.query;
  let selectedClass = req.query.class;
  let found = await StudentAssignment.find()
    .populate({ path: "student", model: "User" })
    .populate({ path: "assignment", model: "Assignment" });
  let arr = [];
  let chartLabel = [];
  let chartData = [];
  let dataForTable = [];
  if (
    stdid != undefined &&
    assignmentid == undefined &&
    selectedClass == undefined &&
    subject == undefined
  ) {
    let foundStd = await User.findById(stdid);
    if (!foundStd)
      return res.status(400).json({ message: "Student not found" });
    found.map((item) => {
      if (item.student._id == stdid) {
        arr.push(item);
      }
    });
  }
  if (
    subject != undefined &&
    assignmentid == undefined &&
    selectedClass == undefined &&
    stdid == undefined
  ) {
    found.map((item) => {
      if (item.assignment.subject?.toLowerCase() == subject?.toLowerCase()) {
        arr.push(item);
      }
    });
  }
  if (
    selectedClass != undefined &&
    subject == undefined &&
    assignmentid == undefined &&
    stdid == undefined
  ) {
    found.map((item) => {
      if (item.assignment.class == selectedClass) {
        arr.push(item);
      }
    });
  }
  if (
    selectedClass == undefined &&
    subject == undefined &&
    assignmentid != undefined &&
    stdid == undefined
  ) {
    found.map((item) => {
      if (item.assignment._id == assignmentid) {
        arr.push(item);
      }
    });
  }
  if (
    subject != undefined &&
    assignmentid != undefined &&
    selectedClass == undefined &&
    stdid == undefined
  ) {
    found.map((item) => {
      if (
        item.assignment.subject?.toLowerCase() == subject?.toLowerCase() &&
        item.assignment._id == assignmentid
      ) {
        arr.push(item);
      }
    });
  }
  if (
    subject != undefined &&
    assignmentid != undefined &&
    selectedClass != undefined &&
    stdid == undefined
  ) {
    found.map((item) => {
      if (
        item.assignment.subject?.toLowerCase() == subject?.toLowerCase() &&
        item.assignment._id == assignmentid &&
        item.assignment.class == selectedClass
      ) {
        console.log(item);
        arr.push(item);
      }
    });
  }
  
  if (
    selectedClass == undefined &&
    subject == undefined &&
    assignmentid == undefined &&
    stdid == undefined
  ) {
    arr = found;
  }
  arr.map((item) => {
    chartLabel.push(
      item.student.name +
        "/" +
        item.assignment.assignmentTitle +
        "/" +
        item.assignment.subject
    );
    dataForTable.push({
      name: item.student.name,
      class: item.student.class,
      assignmentName: item.assignment.assignmentTitle,
      subject: item.assignment.subject,
      scoredMarks: item.answers?.length == 0 ? "Not attend" : item.scoredMarks,
    });
    chartData.push(item.scoredMarks);
  });
  if (dataForTable.length == 0)
    return res.status(400).json({ message: "No data found" });
  const myChart = new QuickChart();
  myChart
    .setConfig({
      type: "bar",
      data: {
        labels: chartLabel,
        datasets: [
          {
            label: "Student Marks",
            data: chartData,
            backgroundColor: "#8f32a8",
          },
        ],
      },
    })
    .setWidth(500)
    .setHeight(280);
  const chartImageUrl = myChart.getUrl();
  // var download = function(uri, filename, callback){
  //   request.head(uri, function(err, res, body){
  //     console.log("content-type:", res.headers["content-type"]);
  //     console.log("content-length:", res.headers["content-length"]);
  //     request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  //   });
  // };
  // download(chartImageUrl, `chart${Date.now()}.png`, function(){
  //   console.log("done");
  // });
  let table = "";
  table += "<div style='heigth:100%'>";
  table += "<h1 style='text-align:center'> Students Report </h1>";
  table += "<img src=" + chartImageUrl + "style='margin-bottom:30px' >";
  table += "<h1 style='text-align:center'>Student Marks</h1>";
  table += "<table border='1' style='width:95%;margin-left:2%;word-break:break-word;background-color:white'>";
  table += "<tr style='background-color:#8f32a8;color:white' >";
  table += "<th style='font-size:24px;max-width:150px;padding:10px'>Student Name</th>";
  table += "<th style='font-size:24px;max-width:150px;padding:10px'>Student Class</th>";
  table += "<th style='font-size:24px;max-width:150px;padding:10px'>Assignment Name</th>";
  table += "<th style='font-size:24px;max-width:150px;padding:10px'>Subject</th>";
  table += "<th style='font-size:24px;max-width:150px;padding:10px'>Student Mark</th>";
  table += "</tr>";
  dataForTable.forEach(function (tableData) {
    table += "<tr >";
    table += "<td style='font-size:20px;max-width:150px;padding:10px'>" +tableData.name +"</td>";
    table += "<td style='font-size:20px;max-width:150px;padding:10px'>" +tableData.class +"</td>";
    table += "<td style='font-size:20px;max-width:150px;padding:10px'>" +tableData.assignmentName +"</td>";
    table += "<td style='font-size:20px;max-width:150px;padding:10px'>" +tableData.subject +"</td>";
    table += "<td style='font-size:20px;max-width:150px;padding:10px'>" +tableData.scoredMarks +"</td>";
    table += "</tr>";
  });
  table += "</table>";
  table += "</div>";
  var options = {
    format: "A4",
    orientation: "landscape",
    border: {
      top: "0.1in",
      left: "0.2in",
    },
    timeout: "120000",
  };
    if( view == "true" &&  view != "false"){
      return res.status(200).json({data:{chartImg:chartImageUrl,tableData:dataForTable}})
    }
    let pdfFileName = `tickets.pdf`;
      pdf.create(table, options).toFile(pdfFileName, function (err, result) {
        if (err) return console.log({ message: err });
        if (result){
          res.download(result.filename);
        }
  });
};


