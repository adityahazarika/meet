var express = require('express');
let employeeModel = require('../public/models/employee');
let meetingModel = require('../public/models/meetings');
var router = express.Router();

/* GET home page. */
router.get('/slots', function(req, res, next) {
  let day = req.query.date;
  let month = req.query.month;
  let year = req.query.year;
  let empId = req.query.empid;
  let startSlot = new Date(`${day}/${month}/${year} 09:00:00`).getTime();
  let endSlot = new Date(`${day}/${month}/${year} 18:00:00`).getTime();

  let meetingsForThatDay = meetingModel.meetings.filter((data)=>{
    return data>startSlot&&data<endSlot&&data.emp_ids.includes(empId)
  })

  meetingsForThatDay = meetingsForThatDay.map((data)=>{
    return data.start_time
  })

  let slotsArr = [];

  let slot = startSlot;
  while(slot<endSlot){
    let slot1 = slot
    let slot2 =  slot1+3600000;
    meetingsForThatDay.forEach(element => {
      if(element>slot1&&element<slot2){
        return 0
      }
      else{
        slotsArr.push(slot1);
      }
    });
    slot = slot2;
  }

  let resp = slotsArr.map((info)=>{
    return new Date(info)
  })
  res.json(
    resp
  )

});

module.exports = router;
