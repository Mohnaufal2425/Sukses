function formatCurrency(value) {

    return new Intl.NumberFormat("id-ID", {

        style: "currency",

        currency: "IDR",

        maximumFractionDigits: 0

    }).format(value);

}


function formatNumber(value) {

    return new Intl.NumberFormat("id-ID").format(value);

}


function updateKPI(data, initialCapital) {

    const metrics =
        calculateMetrics(
            data,
            initialCapital
        );


    document.getElementById(
        "initialCapital"
    ).textContent =
        formatCurrency(
            metrics.initialCapital
        );


    document.getElementById(
        "currentBalance"
    ).textContent =
        formatCurrency(
            metrics.currentBalance
        );


    document.getElementById(
        "netProfit"
    ).textContent =
        formatCurrency(
            metrics.netProfit
        );


    document.getElementById(
        "totalTrades"
    ).textContent =
        formatNumber(
            metrics.totalTrades
        );


    document.getElementById(
        "winningTrades"
    ).textContent =
        formatNumber(
            metrics.winningTrades
        );


    document.getElementById(
        "losingTrades"
    ).textContent =
        formatNumber(
            metrics.losingTrades
        );


    document.getElementById(
        "winRate"
    ).textContent =
        `${metrics.winRate.toFixed(1)}%`;


    document.getElementById(
        "averageWin"
    ).textContent =
        formatCurrency(
            metrics.averageWin
        );


    document.getElementById(
        "averageLoss"
    ).textContent =
        formatCurrency(
            metrics.averageLoss
        );


    document.getElementById(
        "bestTrade"
    ).textContent =
        formatCurrency(
            metrics.bestTrade
        );


    document.getElementById(
        "worstTrade"
    ).textContent =
        formatCurrency(
            metrics.worstTrade
        );


    updateProfitLossColors(
        metrics.netProfit
    );

}

function updateProfitLossColors(netProfit) {

    const element =
        document.getElementById("netProfit");


    element.classList.remove(
        "profit",
        "loss"
    );


    if (netProfit > 0) {

        element.classList.add("profit");

    } else if (netProfit < 0) {

        element.classList.add("loss");

    }

}


function renderTradeTable(data) {

    const tableBody =
        document.getElementById("tradeTableBody");


    tableBody.innerHTML = "";


    data.forEach(trade => {

        const row =
            document.createElement("tr");


        const profitClass =
            trade.profitLoss > 0
                ? "profit"
                : trade.profitLoss < 0
                    ? "loss"
                    : "";


        const sideClass =
            trade.side === "BUY"
                ? "buy"
                : "sell";


        row.innerHTML = `

            <td>
                ${formatDate(trade.date)}
            </td>

            <td>
                <strong>
                    ${trade.symbol}
                </strong>
            </td>

            <td>

                <span class="side-badge ${sideClass}">
                    ${trade.side}
                </span>

            </td>

            <td class="${profitClass}">

                ${formatCurrency(trade.profitLoss)}

            </td>

        `;


        tableBody.appendChild(row);

    });


    document.getElementById(
        "tableResultCount"
    ).textContent =
        `${data.length} results`;


    document.getElementById(
        "tradeCountLabel"
    ).textContent =
        `${data.length} Trades`;

}


function formatDate(dateString) {

    const date =
        new Date(`${dateString}T00:00:00`);


    return date.toLocaleDateString(
        "id-ID",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}