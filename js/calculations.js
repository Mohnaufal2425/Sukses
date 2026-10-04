function calculateMetrics(data, initialCapital) {

    const totalTrades = data.length;


    const winningTrades = data.filter(
        trade => trade.profitLoss > 0
    );


    const losingTrades = data.filter(
        trade => trade.profitLoss < 0
    );


    const netProfit = data.reduce(
        (total, trade) => total + trade.profitLoss,
        0
    );


    const currentBalance =
        initialCapital + netProfit;


    const winCount =
        winningTrades.length;


    const lossCount =
        losingTrades.length;


    const winRate =
        totalTrades > 0
            ? (winCount / totalTrades) * 100
            : 0;


    const averageWin =
        winCount > 0
            ? winningTrades.reduce(
                (total, trade) =>
                    total + trade.profitLoss,
                0
            ) / winCount
            : 0;


    const averageLoss =
        lossCount > 0
            ? losingTrades.reduce(
                (total, trade) =>
                    total + trade.profitLoss,
                0
            ) / lossCount
            : 0;


    const bestTrade =
        data.length > 0
            ? Math.max(
                ...data.map(
                    trade => trade.profitLoss
                )
            )
            : 0;


    const worstTrade =
        data.length > 0
            ? Math.min(
                ...data.map(
                    trade => trade.profitLoss
                )
            )
            : 0;


    const returnPercentage =
        initialCapital > 0
            ? (netProfit / initialCapital) * 100
            : 0;


    return {

        initialCapital,

        currentBalance,

        netProfit,

        totalTrades,

        winningTrades: winCount,

        losingTrades: lossCount,

        winRate,

        averageWin,

        averageLoss,

        bestTrade,

        worstTrade,

        returnPercentage

    };

}