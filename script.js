function addRow() {
    let table = document.getElementById("gpaTable");
    let row = table.insertRow();
    row.innerHTML = `
        <td><input type="text" class="subject" placeholder="Subject Name"></td>
        <td><input type="number" class="credit" placeholder="Credit"></td>
        <td><input type="number" class="marks" placeholder="Marks"></td>
        <td class="grade"></td>
        <td class="point"></td>
        <td><button class="deleteBtn" onclick="deleteRow(this)">❌</button></td>
    `;
}

function deleteRow(btn) {
    let row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function resetAll() {
    let table = document.getElementById("gpaTable");
    // Remove all rows except header
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }
    // Add initial empty row
    addRow();
    document.getElementById("result").innerText = "";
}

function getGrade(marks) {
    if (marks >= 80) return ["A+", 4.00];
    else if (marks >= 75) return ["A", 3.75];
    else if (marks >= 70) return ["A-", 3.50];
    else if (marks >= 65) return ["B+", 3.25];
    else if (marks >= 60) return ["B", 3.00];
    else if (marks >= 55) return ["B-", 2.75];
    else if (marks >= 50) return ["C+", 2.50];
    else if (marks >= 45) return ["C", 2.25];
    else if (marks >= 40) return ["D", 2.00];
    else return ["F", 0.00];
}

function calculateGPA() {
    let credits = document.getElementsByClassName("credit");
    let marks = document.getElementsByClassName("marks");
    let grades = document.getElementsByClassName("grade");
    let points = document.getElementsByClassName("point");

    let totalCredit = 0;
    let totalPoint = 0;

    for (let i = 0; i < credits.length; i++) {
        let credit = parseFloat(credits[i].value);
        let mark = parseFloat(marks[i].value);

        if (!credit || !mark) continue;

        let result = getGrade(mark);

        grades[i].innerText = result[0];
        points[i].innerText = result[1];

        totalCredit += credit;
        totalPoint += credit * result[1];
    }

    if(totalCredit === 0){
        document.getElementById("result").innerText = "Please enter valid credits and marks!";
        return;
    }

    let gpa = totalPoint / totalCredit;
    document.getElementById("result").innerText = "Final GPA: " + gpa.toFixed(2);
}