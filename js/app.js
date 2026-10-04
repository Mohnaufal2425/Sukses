let filteredTrades = [...trades];

let sortColumn = "date";

let sortDirection = "desc";


// Default starting capital
let initialCapital = 5000000;


document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeSymbolFilter();

        setupEventListeners();

        loadCapital();

        renderDashboard();

    }
    
);

function initializeSymbolFilter() {

    const symbolFilter =
        document.getElementById("symbolFilter");


    const symbols =
        [...new Set(
            trades.map(trade => trade.symbol)
        )];


    symbols.sort();


    symbols.forEach(symbol => {

        const option =
            document.createElement("option");


        option.value = symbol;

        option.textContent = symbol;


        symbolFilter.appendChild(option);

    });

}


function setupEventListeners() {

    document.getElementById(
        "searchInput"
    ).addEventListener(
        "input",
        applyFilters
    );


    document.getElementById(
        "sideFilter"
    ).addEventListener(
        "change",
        applyFilters
    );


    document.getElementById(
        "symbolFilter"
    ).addEventListener(
        "change",
        applyFilters
    );


    document.getElementById(
        "dateFrom"
    ).addEventListener(
        "change",
        applyFilters
    );


    document.getElementById(
        "dateTo"
    ).addEventListener(
        "change",
        applyFilters
    );


    document.getElementById(
        "resetFilters"
    ).addEventListener(
        "click",
        resetFilters
    );

    document.getElementById(
    "applyCapital"
    ).addEventListener(
    "click",
    applyCapital
    );


    document.getElementById(
    "resetCapital"
    ).addEventListener(
    "click",
    resetCapital
    );


    document
        .querySelectorAll("th[data-sort]")
        .forEach(header => {

            header.addEventListener(
                "click",
                () => {

                    const column =
                        header.dataset.sort;


                    if (sortColumn === column) {

                        sortDirection =
                            sortDirection === "asc"
                                ? "desc"
                                : "asc";

                    } else {

                        sortColumn = column;

                        sortDirection = "asc";

                    }


                    applySorting();

                    renderDashboard();

                }
            );

        });

}


function applyFilters() {

    const search =
        document.getElementById(
            "searchInput"
        ).value
            .toLowerCase()
            .trim();


    const side =
        document.getElementById(
            "sideFilter"
        ).value;


    const symbol =
        document.getElementById(
            "symbolFilter"
        ).value;


    const dateFrom =
        document.getElementById(
            "dateFrom"
        ).value;


    const dateTo =
        document.getElementById(
            "dateTo"
        ).value;


    filteredTrades =
        trades.filter(trade => {


            const matchesSearch =
                trade.symbol
                    .toLowerCase()
                    .includes(search);


            const matchesSide =
                side === "ALL"
                    ? true
                    : trade.side === side;


            const matchesSymbol =
                symbol === "ALL"
                    ? true
                    : trade.symbol === symbol;


            const matchesDateFrom =
                dateFrom
                    ? trade.date >= dateFrom
                    : true;


            const matchesDateTo =
                dateTo
                    ? trade.date <= dateTo
                    : true;


            return (

                matchesSearch &&

                matchesSide &&

                matchesSymbol &&

                matchesDateFrom &&

                matchesDateTo

            );

        });


    applySorting();

    renderDashboard();

}


function applySorting() {

    filteredTrades.sort(
        (a, b) => {

            let valueA =
                a[sortColumn];

            let valueB =
                b[sortColumn];


            if (
                sortColumn === "profitLoss"
            ) {

                valueA = Number(valueA);

                valueB = Number(valueB);

            }


            if (valueA < valueB) {

                return sortDirection === "asc"
                    ? -1
                    : 1;

            }


            if (valueA > valueB) {

                return sortDirection === "asc"
                    ? 1
                    : -1;

            }


            return 0;

        }
    );

}


function renderDashboard() {

    updateKPI(
        filteredTrades,
        initialCapital
    );

    renderTradeTable(
        filteredTrades
    );

}


function resetFilters() {

    document.getElementById(
        "searchInput"
    ).value = "";


    document.getElementById(
        "sideFilter"
    ).value = "ALL";


    document.getElementById(
        "symbolFilter"
    ).value = "ALL";


    document.getElementById(
        "dateFrom"
    ).value = "";


    document.getElementById(
        "dateTo"
    ).value = "";


    filteredTrades = [...trades];


    applySorting();

    renderDashboard();

}

function loadCapital() {

    const savedCapital =
        localStorage.getItem(
            "tradingDashboardCapital"
        );


    if (savedCapital !== null) {

        initialCapital =
            Number(savedCapital);

    }


    document.getElementById(
        "capitalInput"
    ).value =
        initialCapital;

}

function applyCapital() {

    const input =
        document.getElementById(
            "capitalInput"
        );


    const value =
        Number(input.value);


    if (!Number.isFinite(value) || value < 0) {

        alert(
            "Please enter a valid capital amount."
        );

        return;

    }


    initialCapital = value;


    localStorage.setItem(
        "tradingDashboardCapital",
        initialCapital
    );


    renderDashboard();

}

function resetCapital() {

    initialCapital = 5000000;


    localStorage.setItem(
        "tradingDashboardCapital",
        initialCapital
    );


    document.getElementById(
        "capitalInput"
    ).value =
        initialCapital;


    renderDashboard();

}

