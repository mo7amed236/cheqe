document.addEventListener("DOMContentLoaded", () => {
    renderTable();
    document.getElementById("addCheque").addEventListener("click", addCheque);
});

function renderTable() {
    const tableBody = document.querySelector("#chequesTable tbody");
    tableBody.innerHTML = "";

    db.collection("cheques").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const cheque = doc.data();
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${cheque.chequeNumber}</td>
                <td>${cheque.chequeDate}</td>
                <td>${cheque.chequeAmount}</td>
                <td>${cheque.chequePayee}</td>
                <td>${cheque.chequeStatus}</td>
                <td>
                    <button onclick="deleteCheque('${doc.id}')">حذف</button>
                    <button onclick="updateCheque('${doc.id}')">تعديل</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    });
}

function addCheque() {
    const chequeNumber = document.getElementById("chequeNumber").value;
    const chequeDate = document.getElementById("chequeDate").value;
    const chequeAmount = document.getElementById("chequeAmount").value;
    const chequePayee = document.getElementById("chequePayee").value;
    const chequeStatus = document.getElementById("chequeStatus").value;

    db.collection("cheques").add({
        chequeNumber,
        chequeDate,
        chequeAmount,
        chequePayee,
        chequeStatus,
    }).then(() => {
        alert("تمت إضافة الشيك بنجاح!");
        renderTable();
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}

function deleteCheque(id) {
    if (confirm("هل أنت متأكد من حذف الشيك؟")) {
        db.collection("cheques").doc(id).delete().then(() => {
            alert("تم حذف الشيك!");
            renderTable();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
}