import type { ChainInfo } from "@keplr-wallet/types";
import React, { useEffect, useState } from "react";
import osmo from "../config/osmosis";
import {assertIsDeliverTxSuccess, SigningStargateClient} from "@cosmjs/stargate";

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
	const connectWallet = async () => {
		if(!window.keplr){
			alert("please install keplr extension!");
		}
		console.log("------connect keplr------");
		// 添加链到keplr
		await window.keplr.experimentalSuggestChain(chain);
		await window.keplr.enable(chain.chainId);

		const offlineSigner = window.getOfflineSigner(chain.chainId);

		const accounts = await offlineSigner.getAccounts();
		const client = await SigningStargateClient.connectWithSigner(chain.rpc,offlineSigner);

		// add your chain to keplr
		setAddress(accounts[0].address);
		setClient(client);

	};

	// 余额查询  Todo
	const getBalances = async () => {
		if(client){
			const _balance = await client.getBalance(address,chain.stakeCurrency.coinMinimalDenom);
			setBalance(_balance);
		}
	};

	// txhash查询  Todo
	const getTx = async () => {
		if(!tx) return;
		const result = await client.getTx(tx);
		setTxRes(result);
	};

	// 转账 Todo
	const sendToken = async () => {
		if(!client || !recipent || !address) return;

		// 精度为6次方
		const convertAmount = 10 * 1e6;
		const amount = [
			{
				denom: chain.stakeCurrency.coinMinimalDenom,  // 转账单位
				amount: convertAmount.toString(),  // 转账金额
			}
		];
		const fee = {
			amount:[
				{
					denom: chain.stakeCurrency.coinMinimalDenom,
					amount: 0.025,
				}
			],
			gas: "200000",
		};

		try{
			const result = await client.sendTokens(
				address,
				recipent,
				amount,
				fee,
				""
			);
			assertIsDeliverTxSuccess(result);  // 广播是否成功的判断
			if(result.code == 0){
				alert(
					"transfer success,height:" +
					result.height +
					"hash:" +
					result.transactionHash
				);
				setTx(result.transactionHash);
			}
		}catch (e){
			console.log("keplr getTx error:");
			console.log(e);
		}

	};

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
