
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(records) {
  return records.map(createEmployeeRecord);
}


function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}

function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}

function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find((e) => e.date === date);
  const timeOut = this.timeOutEvents.find((e) => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}


function allWagesFor() {
  const dates = this.timeInEvents.map((e) => e.date);
  return dates.reduce(
    (total, d) => total + wagesEarnedOnDate.call(this, d),
    0
  );
}


function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((rec) => rec.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(
    (total, rec) => total + allWagesFor.call(rec),
    0
  );
}


module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  findEmployeeByFirstName,
  calculatePayroll,
};


if (require.main === module) {
  const emps = createEmployeeRecords([
    ["Gray", "Worm", "Security", 10],
    ["Daenerys", "Targaryen", "CEO", 100],
  ]);


  createTimeInEvent.call(emps[0], "2025-06-27 0900");
  createTimeOutEvent.call(emps[0], "2025-06-27 1700");


  createTimeInEvent.call(emps[1], "2025-06-27 1000");
  createTimeOutEvent.call(emps[1], "2025-06-27 1600");

  console.log("Gray Worm wages:", allWagesFor.call(emps[0])); 
  console.log("Dany wages:", allWagesFor.call(emps[1]));      
  console.log("Total payroll:", calculatePayroll(emps));     
}