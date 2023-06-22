import "@/global";
import "@/global.scss";
import React from "react";
import ReactDOM from "react-dom";
import Stargate from "./Components/Stargate";
import Keplr from "./Components/Keplr";

const App = () => {
	return (
		<div style={{ padding: "20px" }}>
			<div className="container">
				<div className="left">
					<h2>Cosmjs 实践</h2>
					<p>-- Stargate --</p>
					<ul>
						<li>连接/断开</li>
						<li>创建账户</li>
						<li>水龙头</li>
						<li>查余额</li>		
						<li>查账户</li>	
						<li>查高度</li>
						<li>查区块</li>	
						<li>查所有余额</li>
						<li>查交易频次</li>					
					</ul>
					<p>-- Keplr --</p>
					<ul>
						<li>添加链到keplr</li>
						<li>连接钱包</li>
						<li>实现转账</li>
						{/* <li>sendIBCToken</li> */}
						<li>广播</li>
						<li>交易hash查询</li>
					</ul>
				</div>
				<div className="right">
					<Stargate />
					<Keplr/>
				</div>
			</div>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
