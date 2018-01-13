// @flow

import React from "react"
import * as api from "./api"

type Props = {}
type State = {
    smartCashPrice?: number,
    numSmartCash: number | "",
    numGlobalSmartRewardCash: number | "",
    numGlobalMasterNodes: number | "",
    currentBlockHeight?: number,
    fillAuto: boolean
}

const NUMBER_SECONDS_DAY = 86400
const BLOCKS_TIME = 55
const NUMBER_BLOCKS_DAY = NUMBER_SECONDS_DAY / BLOCKS_TIME
const MASTERNODE_PRICE = 10000
const NUMBER_DAYS_MONTH = 365 / 12

function getBlockReward(blockHeight: number) {
    return 5000 * 143500 / blockHeight
}

function getRewardMonth(blockReward: number) {
    return NUMBER_BLOCKS_DAY * NUMBER_DAYS_MONTH * blockReward
}

function getMasterNodeBlockReward(blockReward: number) {
    return blockReward * 0.1
}

function getSmartRewardBlockReward(blockReward: number) {
    return blockReward * 0.15
}

function getMyMasterNodeMonthlyReward(myMasterNodes: number, globalMasterNodes: number, masterNodeBlockReward) {
    console.log(myMasterNodes, globalMasterNodes)
    return myMasterNodes / globalMasterNodes * getRewardMonth(masterNodeBlockReward)
}

function getMySmartRewardMonthlyReward(
    mySmartRewardCash: number,
    globalSmartRewardCash: number,
    smartRewardBlockReward
) {
    return mySmartRewardCash / globalSmartRewardCash * getRewardMonth(smartRewardBlockReward)
}

function getMasterNodeAverageWaitingTime(myMasterNodes: number, globalMasterNodes: number) {
    return BLOCKS_TIME * globalMasterNodes / myMasterNodes
}

function getMasterNodeAverageWaitingDaysString(masterNodeAverageWaitingTime: number) {
    if (masterNodeAverageWaitingTime === Infinity || Number.isNaN(masterNodeAverageWaitingTime)) {
        return "-"
    }
    return `${(masterNodeAverageWaitingTime / NUMBER_SECONDS_DAY).toFixed(2)} days`
}

function getNumMyMasterNode(numSmartCash: number) {
    return Math.floor(numSmartCash / MASTERNODE_PRICE)
}

export default class Calc extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        api.currentBlockHeight().then(result => {
            console.log("currentBlockHeight", result)
        })
        api.coinMarketcap().then(result => {
            console.log("coinMarketcap", result)
        })
        api.eligibleSmartRewards().then(result => {
            console.log("eligibleSmartRewards", result)
        })
    }

    state = {
        smartCashPrice: 1.9,
        numSmartCash: 10000,
        numGlobalSmartRewardCash: 326 * 1000000, // TODO
        numGlobalMasterNodes: 5000, // TODO
        currentBlockHeight: 272715, // TODO make dynamic
        fillAuto: true
    }

    handleNumSmart = (event: SyntheticInputEvent<>) => {
        this.setState({ numSmartCash: event.target.value !== "" ? parseInt(event.target.value, 10) : "" })
    }

    handleFillAuto = (event: SyntheticInputEvent<>) => {
        this.setState({ fillAuto: event.target.checked })
    }

    handleNumGlobalMasterNodes = (event: SyntheticInputEvent<>) => {
        this.setState({ numGlobalMasterNodes: event.target.value !== "" ? parseInt(event.target.value, 10) : "" })
    }

    handleNumGlobalSmartRewardCash = (event: SyntheticInputEvent<>) => {
        this.setState({ numGlobalSmartRewardCash: event.target.value !== "" ? parseInt(event.target.value, 10) : "" })
    }

    render() {
        const {
            currentBlockHeight,
            numGlobalSmartRewardCash,
            numGlobalMasterNodes,
            fillAuto,
            smartCashPrice
        } = this.state

        if (
            currentBlockHeight === undefined ||
            numGlobalSmartRewardCash === "" ||
            numGlobalMasterNodes === "" ||
            smartCashPrice === undefined
        ) {
            return <div />
        }

        const numSmartCash: number = !Number.isNaN(this.state.numSmartCash) ? (this.state.numSmartCash: any) : 0
        const numMyMasterNode = getNumMyMasterNode(numSmartCash)
        const masterNodeRequirementsString = numMyMasterNode > 0 ? `${MASTERNODE_PRICE * numMyMasterNode / 1000}K` : 0
        const masterNodeRequirementsConversionString =
            numMyMasterNode > 0 ? `${MASTERNODE_PRICE * numMyMasterNode * smartCashPrice / 1000}K` : 0
        const masterNodeAverageWaitingTime = getMasterNodeAverageWaitingTime(numMyMasterNode, numGlobalMasterNodes)

        const blockReward = getBlockReward(currentBlockHeight)

        const masterNodeBlockReward = getMasterNodeBlockReward(blockReward)
        const myMasterNodeRewardMonth = getMyMasterNodeMonthlyReward(
            numMyMasterNode,
            numGlobalMasterNodes,
            masterNodeBlockReward
        )

        const smartRewardBlockReward = getSmartRewardBlockReward(blockReward)
        const mySmartRewardMonth = getMySmartRewardMonthlyReward(
            numSmartCash,
            numGlobalSmartRewardCash,
            smartRewardBlockReward
        )

        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="box">
                        <div className="row">
                            <div className="col-xs-12">
                                <h3>SmartNodes/SmartRewards Calculator</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <p>
                                    Current SmartCash Price:&nbsp;
                                    {this.state.smartCashPrice ? `$${this.state.smartCashPrice} USD` : "Loading"}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <form>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-addon">SmartCash Balance</div>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Enter the number of SmartCash you have."
                                                        value={numSmartCash}
                                                        onChange={this.handleNumSmart}
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-addon">Currency</div>
                                                    <select className="form-control">
                                                        <option>BTC</option>
                                                        <option>EUR</option>
                                                        <option>USD</option>
                                                        <option>GBP</option>
                                                    </select>
                                                </div>
                                            </div> */}
                                            <div className="form-group">
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            onChange={this.handleFillAuto}
                                                            checked={fillAuto}
                                                        />
                                                        <span>Fill automatically SmartCash stats</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <form>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-addon">Number of Masternodes</div>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Loading..."
                                                        disabled={fillAuto}
                                                        value={numGlobalMasterNodes}
                                                        onChange={this.handleNumGlobalMasterNodes}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-addon">
                                                        Total SmartCash Eligible for SmartRewards
                                                    </div>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Loading..."
                                                        disabled={fillAuto}
                                                        value={numGlobalSmartRewardCash}
                                                        onChange={this.handleNumGlobalSmartRewardCash}
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="panel panel-default">
                                    <div className="panel-heading">Results</div>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th className="col-sm-2" />
                                                <th className="col-sm-5">{numMyMasterNode} Masternodes</th>
                                                <th className="col-sm-5">SmartRewards</th>
                                            </tr>
                                            <tr>
                                                <th>Overview</th>
                                                <td colSpan="2">
                                                    <div className="progress">
                                                        <div
                                                            className="progress-bar progress-bar-success"
                                                            role="progressbar"
                                                            aria-valuenow={
                                                                100 *
                                                                myMasterNodeRewardMonth /
                                                                (mySmartRewardMonth + myMasterNodeRewardMonth)
                                                            }
                                                            aria-valuemin="0"
                                                            aria-valuemax="100"
                                                            css={{
                                                                width: `${100 *
                                                                    myMasterNodeRewardMonth /
                                                                    (mySmartRewardMonth + myMasterNodeRewardMonth)}%`
                                                            }}
                                                        >
                                                            Masternodes
                                                        </div>
                                                        <div
                                                            className="progress-bar"
                                                            role="progressbar"
                                                            aria-valuenow={
                                                                100 *
                                                                mySmartRewardMonth /
                                                                (mySmartRewardMonth + myMasterNodeRewardMonth)
                                                            }
                                                            aria-valuemin="0"
                                                            aria-valuemax="100"
                                                            css={{
                                                                width: `${100 *
                                                                    mySmartRewardMonth /
                                                                    (mySmartRewardMonth + myMasterNodeRewardMonth)}%`
                                                            }}
                                                        >
                                                            SmartRewards
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Requirements</th>
                                                <td>
                                                    <span>{masterNodeRequirementsString} SMART </span>
                                                    <sub>{masterNodeRequirementsConversionString} USD</sub>
                                                </td>
                                                <td>&#8805;1000 SMART</td>
                                            </tr>
                                            <tr>
                                                <th>Reward</th>
                                                <td>
                                                    <span>{masterNodeBlockReward.toFixed(2)} SMART </span>
                                                    <sub>{(masterNodeBlockReward * smartCashPrice).toFixed(2)} USD</sub>
                                                </td>
                                                <td>
                                                    <span>{mySmartRewardMonth.toFixed(2)} SMART </span>
                                                    <sub>{(mySmartRewardMonth * smartCashPrice).toFixed(2)} USD</sub>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Average waiting time</th>
                                                <td>
                                                    {getMasterNodeAverageWaitingDaysString(
                                                        masterNodeAverageWaitingTime
                                                    )}
                                                </td>
                                                <td>{NUMBER_DAYS_MONTH.toFixed(2)} days (25th of each month)</td>
                                            </tr>
                                            <tr>
                                                <th>Monthly revenue</th>
                                                <td>
                                                    <span>{myMasterNodeRewardMonth.toFixed(2)} SMART </span>
                                                    <sub>
                                                        {(myMasterNodeRewardMonth * smartCashPrice).toFixed(2)} USD
                                                    </sub>
                                                </td>
                                                <td>
                                                    <span>{mySmartRewardMonth.toFixed(2)} SMART</span>
                                                    <sub>{(mySmartRewardMonth * smartCashPrice).toFixed(2)} USD</sub>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
