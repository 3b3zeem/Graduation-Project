import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./OneRequest.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import authService from "../../../../../Service/auth-service";

const OneRequest = () => {
  const { requestID } = useParams();
  const navigate = useNavigate();

  const [permissionRequest, setPermissionRequest] = useState(null);
  const fetchPermissionRequest = async () => {
    try {
      const response = await fetch(
        `https://localhost:7120/api/permission-requests/byId/${requestID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPermissionRequest(data.data);
    } catch (error) {
      console.error("Error fetching permission request:", error);
    }
  };
  useEffect(() => {
    fetchPermissionRequest();
  }, [requestID]);

  const DownloadRequest = async () => {
    try {
      const response = await fetch(
        `https://localhost:7120/api/permission-requests/download/${requestID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/pdf",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Assuming you want to download the PDF directly in the browser
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${requestID}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error fetching permission request:", error);
      toast.error("Could not find document for permission request!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  const handleDownload = async () => {
    await DownloadRequest();
  };

  const [approvalMessage, setApprovalMessage] = useState("");
  const approveRequest = async () => {
    try {
      const response = await fetch(
        `https://localhost:7120/api/permission-requests/approve/${requestID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setApprovalMessage(data.message);
      toast.success("Successfully Approved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      navigate("/PermissionList");
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const [rejectionMessage, setRejectionMessage] = useState("");
  const rejectRequest = async () => {
    try {
      const response = await fetch(
        `https://localhost:7120/api/permission-requests/reject/${requestID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRejectionMessage(data.message);
      toast.info("Successfully Rejected!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      navigate("/PermissionList");
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div>
      <div className="page d-flex">
        <div className="containChange details">
          {permissionRequest ? (
            <>
              <div className="download">
                <h1>
                  <span>Request No. {permissionRequest.requestID}</span>
                </h1>
                <button onClick={handleDownload} className="btn btn-success">
                  Download Document
                </button>
              </div>
              <form className="formChange left">
                <div className="form-left">
                  <div className="current">
                    <h3>
                      Request ID: <span>{permissionRequest.requestID}</span>
                    </h3>
                  </div>
                  <div className="current">
                    <h3>
                      User ID: <span>{permissionRequest.userID}</span>
                    </h3>
                  </div>
                  <div className="current">
                    <h3>
                      User Name: <span>{permissionRequest.username}</span>
                    </h3>
                  </div>
                  <div className="current">
                    <h3>
                      Email: <span>{permissionRequest.email}</span>
                    </h3>
                  </div>
                  <div className="current">
                    <h3>
                      Contact Information:{" "}
                      <span>{permissionRequest.contactInformation}</span>
                    </h3>
                  </div>
                </div>
                <div className="form-right">
                  <div className="current">
                    <h3>
                      Company ID: <span>{permissionRequest.companyID}</span>
                    </h3>
                  </div>
                  <div className="current">
                    <h3>
                      Company Name: <span>{permissionRequest.companyName}</span>
                    </h3>
                  </div>
                  <div className="current">
                    <h3>
                      Description: <span>{permissionRequest.description}</span>
                    </h3>
                  </div>
                  <div className="current">
                    <h3>
                      Company Address:{" "}
                      <span>{permissionRequest.companyAddress}</span>
                    </h3>
                  </div>
                  <div className="current">
                    <h3>
                      Request Status: <span>{permissionRequest.status}</span>
                    </h3>
                  </div>
                </div>
              </form>
              {permissionRequest.status.includes("pending") &&
                currentUser.roles.includes("Admin") &&
                currentUser.roles.length === 2 && (
                  <>
                    <div className="btnChange">
                      <button onClick={approveRequest} type="submit">
                        Approve
                      </button>
                      <button onClick={rejectRequest} type="submit">
                        Reject
                      </button>
                    </div>
                  </>
                )}
            </>
          ) : (
            <p
              style={{
                textAlign: "center",
                fontSize: "30px",
                marginTop: "25%",
              }}
            >
              Loading...
            </p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OneRequest;
