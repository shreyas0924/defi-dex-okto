"use client";
import { useState } from "react";
import { useOkto, type OktoContextType } from "okto-sdk-react";
import { useRouter } from "next/navigation";
export default function HomePage() {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [wallets, setWallets] = useState<any>(null);
  const [transferResponse, setTransferResponse] = useState<any>(null);
  const [orderResponse, setOrderResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const router = useRouter();
  const { isLoggedIn } = useOkto() as OktoContextType;

  if (!isLoggedIn) {
    router.push("/login");
  }

  const {
    getUserDetails,
    getPortfolio,
    createWallet,
    transferTokens,
    orderHistory,
  } = useOkto() as OktoContextType;

  const [transferData, setTransferData] = useState({
    network_name: "",
    token_address: "",
    recipient_address: "",
    quantity: "",
  });

  const [orderData, setOrderData] = useState({
    order_id: "",
  });

  const fetchUserDetails = async () => {
    try {
      const details = await getUserDetails();
      setUserDetails(details);
      setActiveSection("userDetails");
    } catch (error: any) {
      setError(`Failed to fetch user details: ${error.message}`);
    }
  };

  const fetchPortfolio = async () => {
    try {
      const portfolio = await getPortfolio();
      setPortfolioData(portfolio);
      setActiveSection("portfolio");
    } catch (error: any) {
      setError(`Failed to fetch portfolio: ${error.message}`);
    }
  };

  const fetchWallets = async () => {
    try {
      const walletsData = await createWallet();
      console.log(walletsData);
      setWallets(walletsData);
      setActiveSection("wallets");
    } catch (error: any) {
      setError(`Failed to fetch wallets: ${error.message}`);
    }
  };

  const handleTransferTokens = async (e: any) => {
    e.preventDefault();
    try {
      const response = await transferTokens(transferData);
      console.log(response);
      setTransferResponse(response);
      setActiveSection("transferResponse");
    } catch (error: any) {
      console.log(error);
      setError(
        `Failed to transfer tokens: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleInputChange = (e: any) => {
    setTransferData({ ...transferData, [e.target.name]: e.target.value });
  };

  const handleOrderCheck = async (e: any) => {
    e.preventDefault();
    try {
      const response = await orderHistory(orderData);
      setOrderResponse(response);
      setActiveSection("orderResponse");
    } catch (error: any) {
      setError(
        `Failed to fetch order status: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleInputChangeOrders = (e: any) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  };

  const buttonStyle = {
    margin: "5px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
  };

  const inputStyle = {
    margin: "5px",
    padding: "10px",
    width: "100%",
    fontSize: "16px",
  };

  return (
    <div style={containerStyle}>
      <h1>Home Page</h1>

      <div>
        <button style={buttonStyle} onClick={fetchUserDetails}>
          View User Details
        </button>
        <button style={buttonStyle} onClick={fetchPortfolio}>
          View Portfolio
        </button>
        <button style={buttonStyle} onClick={fetchWallets}>
          View Wallets
        </button>
      </div>

      {activeSection === "userDetails" && userDetails && (
        <div>
          <h2>User Details:</h2>
          <pre>{JSON.stringify(userDetails, null, 2)}</pre>
        </div>
      )}

      {activeSection === "portfolio" && portfolioData && (
        <div>
          <h2>Portfolio Data:</h2>
          <pre>{JSON.stringify(portfolioData, null, 2)}</pre>
        </div>
      )}

      {activeSection === "wallets" && wallets && (
        <div>
          <h2>Wallets:</h2>
          <pre>{JSON.stringify(wallets, null, 2)}</pre>
        </div>
      )}

      <button
        onClick={async () => {
          await fetchPortfolio();
          console.log("portfolio refreshed");
        }}
      >
        Refresh portfolio
      </button>
      <h2>Transfer Tokens</h2>
      <form style={formStyle} onSubmit={handleTransferTokens}>
        <input
          style={inputStyle}
          type="text"
          name="network_name"
          placeholder="Network Name"
          value={transferData.network_name}
          onChange={handleInputChange}
          required
        />
        <input
          style={inputStyle}
          type="text"
          name="token_address"
          placeholder="Token Address"
          value={transferData.token_address}
          onChange={handleInputChange}
          required
        />
        <input
          style={inputStyle}
          type="text"
          name="quantity"
          placeholder="Quantity"
          value={transferData.quantity}
          onChange={handleInputChange}
          required
        />
        <input
          style={inputStyle}
          type="text"
          name="recipient_address"
          placeholder="Recipient Address"
          value={transferData.recipient_address}
          onChange={handleInputChange}
          required
        />
        <button style={buttonStyle} type="submit">
          Transfer Tokens
        </button>
      </form>

      {activeSection === "transferResponse" && transferResponse && (
        <div>
          <h2>Transfer Response:</h2>
          <pre>{JSON.stringify(transferResponse, null, 2)}</pre>
        </div>
      )}

      <h2>Check Order</h2>
      <form style={formStyle} onSubmit={handleOrderCheck}>
        <input
          style={inputStyle}
          type="text"
          name="order_id"
          placeholder="Order Id"
          value={orderData.order_id}
          onChange={handleInputChangeOrders}
          required
        />
        <button style={buttonStyle} type="submit">
          Check Status
        </button>
      </form>

      {activeSection === "orderResponse" && orderResponse && (
        <div>
          <h2>Order Status:</h2>
          <pre>{JSON.stringify(orderResponse, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ color: "red" }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
