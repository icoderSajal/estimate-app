function addRow() {

    let tableBody =
        document.getElementById("tableBody");

    let row =
        document.createElement("tr");

    row.innerHTML = `

        <td>

            <select>
                <option>Ashirvad</option>
                <option>Apollo</option>

                <option>Birla</option>

                <option>Astral</option>

                <option>Supreme</option>

                <option>Finolex</option>

            </select>

        </td>

        <td>
            <input type="text"
                   placeholder="Product Name">
        </td>

        <td>
            <input type="text"
                   placeholder="Size">
        </td>

        <td>
            <input type="number"
                   class="rate"
                   placeholder="Rate">
        </td>

        <td>
            <input type="number"
                   class="qty"
                   placeholder="Qty">
        </td>

        <td>
            <input type="number"
                   class="amount"
                   readonly>
        </td>

        <td>
            <button class="delete-btn"
                    onclick="deleteRow(this)">
                X
            </button>
        </td>

    `;

    tableBody.appendChild(row);

    attachEvents();
}

function deleteRow(button) {

    button.parentElement.parentElement.remove();

    calculateGrandTotal();
}

function attachEvents() {

    let rates =
        document.querySelectorAll(".rate");

    let qtys =
        document.querySelectorAll(".qty");

    rates.forEach((rate, index) => {

        rate.oninput = function () {

            calculate(index);

        };

    });

    qtys.forEach((qty, index) => {

        qty.oninput = function () {

            calculate(index);

        };

    });

}

function calculate(index) {

    let rates =
        document.querySelectorAll(".rate");

    let qtys =
        document.querySelectorAll(".qty");

    let amounts =
        document.querySelectorAll(".amount");

    let rate =
        parseFloat(rates[index].value) || 0;

    let qty =
        parseFloat(qtys[index].value) || 0;

    let total =
        rate * qty;

    amounts[index].value =
        total.toFixed(2);

    calculateGrandTotal();
}

function calculateGrandTotal() {

    let amounts =
        document.querySelectorAll(".amount");

    let totalAmount = 0;

    amounts.forEach(amount => {

        totalAmount +=
            parseFloat(amount.value) || 0;

    });

    document.getElementById("totalAmount").value =
        totalAmount.toFixed(2);

    let discount =
        parseFloat(
            document.getElementById("discount").value
        ) || 0;

    let fareCharge =
        parseFloat(
            document.getElementById("fareCharge").value
        ) || 0;

    let grandTotal =
        totalAmount - discount + fareCharge;

    document.getElementById("grandTotal").innerText =
        grandTotal.toFixed(2);
}

function downloadPDF() {

    window.print();
}

document
    .getElementById("discount")
    .addEventListener(
        "input",
        calculateGrandTotal
    );

document
    .getElementById("fareCharge")
    .addEventListener(
        "input",
        calculateGrandTotal
    );

attachEvents();
