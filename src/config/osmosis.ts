const osmosis = {
	chainId: "osmo-test-5",
	chainName: "osmo-test-5",
	rpc: "https://rpc.testnet.osmosis.zone",
	rest: "https://lcd.testnet.osmosis.zone",
	stakeCurrency: {
		coinDenom: "OSMO",
		coinMinimalDenom: "uosmo",
		coinDecimals: 6,
	},
	bip44: {
		coinType: 118,
	},
	bech32Config: {
		bech32PrefixAccAddr: "osmo",
		bech32PrefixAccPub: "osmopub",
		bech32PrefixValAddr: "osmovaloper",
		bech32PrefixValPub: "osmovaloperpub",
		bech32PrefixConsAddr: "osmovalcons",
		bech32PrefixConsPub: "osmovalconspub",
	},
	currencies: [
		{
			coinDenom: "OSMO",
			coinDecimals: 6,
			coinMinimalDenom: "uosmo",
		},
	],
	feeCurrencies: [
		{
			coinDenom: "OSMO",
			coinMinimalDenom: "uosmo",
			coinDecimals: 6,
		},
	],
	gasPriceStep: {
		low: 0.01,
		average: 0.025,
		high: 0.04,
	},
};

export default osmosis;
