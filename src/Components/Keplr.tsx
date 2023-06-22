import type { ChainInfo } from "@keplr-wallet/types";
import React, { useEffect, useState } from "react";
import osmo from "../config/osmosis";

function Keplr() {
	const [chain, setChain] = useState<ChainInfo>(osmo);
	const [selected, setSelected] = useState<string>("OSMO");
	const [client, setClient] = useState<any>();
	const [address, setAddress] = useState<any>();

	const [balance, setBalance] = useState<any>();
	const [recipent, setRecipent] = useState<any>(
		"osmo1a27efnuln9xzzsv6hxes46fxwdg5yyr5s4vnyq"
	);
	const [tx, setTx] = useState<any>();
	const [sendHash, setSendHash] = useState<any>();
	const [txRes, setTxRes] = useState<any>();

	// 初始化 chain
	useEffect(() => {
		connectWallet();
	}, [chain]);

	// 查余额
	useEffect(() => {
		if (!address && !client) return;
		getBalances();
	}, [address, client, sendHash]);

	// 连接keplr钱包  Todo
	const connectWallet = async () => {};

	// 余额查询  Todo
	const getBalances = async () => {};

	// txhash查询  Todo
	const getTx = async () => {};

	// 转账 Todo
	const sendToken = async () => {};

	return (
		<div className="keplr">
			<h2>Keplr Wallet</h2>
			<label>
				<span>
					Chain: &nbsp;
					<select
						className="select"
						value={selected}
						onChange={(e) => setSelected(e.target.value)}
					>
						<option value="OSMO">OSMO</option>
						<option value="SPX">SPX</option>
					</select>
				</span>{" "}
				&nbsp;
				<button onClick={connectWallet}>
					{address ? "已连接" : "连接keplr"}
				</button>
			</label>
			<div className="weight">地址：{address}</div>
			<div className="weight">
				<span style={{ whiteSpace: "nowrap" }}>余额: &nbsp;</span>
				<div>
					{balance?.amount && (
						<>
							<span>
								{parseFloat(
									String(Number(balance?.amount) / Math.pow(10, 6))
								).toFixed(2)}
							</span>
							<span> {balance?.denom}</span>
						</>
					)}
				</div>
			</div>
			<hr />
			<label>1、sendTokens() & broadcastTx</label>
			<div>
				<input
					type="text"
					value={recipent}
					placeholder="address"
					style={{ width: "350px" }}
					onChange={(e) => setRecipent(e.target.value)}
				/>
				&nbsp;
				<button onClick={sendToken}>
					发送 10 {chain.feeCurrencies[0].coinMinimalDenom}
				</button>
			</div>
			<label>2、getTx()</label>
			<div>
				<input value={tx} readOnly style={{ width: "350px" }} />
				&nbsp;
				<button onClick={getTx}>查询</button>
			</div>
			<div className="tx">
				{txRes && (
					<>
						<div>height:{txRes?.height} </div>
						<div>gasUsed:{txRes?.gasUsed} </div>
						<div>gasWanted:{txRes?.gasWanted} </div>
					</>
				)}
			</div>
		</div>
	);
}

export default Keplr;
