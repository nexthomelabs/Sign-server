import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { saveTourSteps } from "../redux/reducers/TourStepsReducer";
import ModalUi from "./ModalUi";
import Loader from "./Loader";
import pad from "../assets/images/dp.png";
import { handleDownloadPdf } from "../constant/Utils";
import BulkSendUi from "../components/BulkSendUi";
import Parse from "parse";
import axios from "axios";

function GetReportDisplay(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoader, setIsLoader] = useState(false);
  const [isDownloading, setIsDownloading] = useState("");
  const [isRename, setIsRename] = useState({});
  const [isDelete, setIsDelete] = useState({});
  const [isRevoke, setIsRevoke] = useState({});
  const [isExtendExpiry, setIsExtendExpiry] = useState({});
  const [expiryDate, setExpiryDate] = useState("");
  const [isResend, setIsResend] = useState({});
  const [isOption, setIsOption] = useState({});
  const [isBulkSend, setIsBulkSend] = useState({});
  const [isShareWith, setIsShareWith] = useState({});
  const [isShareModal, setIsShareModal] = useState({});
  const [shareUrl, setShareUrl] = useState("");
  const [isRecreate, setIsRecreate] = useState({});
  const [isImport, setIsImport] = useState(false);
  const [isImportLoader, setIsImportLoader] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [isImportError, setIsImportError] = useState("");
  const [isImportSuccess, setIsImportSuccess] = useState("");
  const [isImportData, setIsImportData] = useState([]);
  const [isImportDataError, setIsImportDataError] = useState([]);
  const [isImportDataSuccess, setIsImportDataSuccess] = useState([]);
  const [isImportDataLoading, setIsImportDataLoading] = useState(false);
  const [isImportDataTotal, setIsImportDataTotal] = useState(0);
  const [isImportDataSuccessCount, setIsImportDataSuccessCount] = useState(0);
  const [isImportDataErrorCount, setIsImportDataErrorCount] = useState(0);
  const [isImportDataTotalCount, setIsImportDataTotalCount] = useState(0);
  const [isImportDataProgress, setIsImportDataProgress] = useState(0);
  const [isImportDataStatus, setIsImportDataStatus] = useState("");
  const [isImportDataMessage, setIsImportDataMessage] = useState("");
  const [isImportDataError2, setIsImportDataError2] = useState("");
  const [isImportDataSuccess2, setIsImportDataSuccess2] = useState("");
  const [isImportDataLoading2, setIsImportDataLoading2] = useState(false);
  const [isImportDataTotal2, setIsImportDataTotal2] = useState(0);
  const [isImportDataSuccessCount2, setIsImportDataSuccessCount2] = useState(0);
  const [isImportDataErrorCount2, setIsImportDataErrorCount2] = useState(0);
  const [isImportDataTotalCount2, setIsImportDataTotalCount2] = useState(0);
  const [isImportDataProgress2, setIsImportDataProgress2] = useState(0);
  const [isImportDataStatus2, setIsImportDataStatus2] = useState("");
  const [isImportDataMessage2, setIsImportDataMessage2] = useState("");
  const [isImportDataError3, setIsImportDataError3] = useState("");
  const [isImportDataSuccess3, setIsImportDataSuccess3] = useState("");
  const [isImportDataLoading3, setIsImportDataLoading3] = useState(false);
  const [isImportDataTotal3, setIsImportDataTotal3] = useState(0);
  const [isImportDataSuccessCount3, setIsImportDataSuccessCount3] = useState(0);
  const [isImportDataErrorCount3, setIsImportDataErrorCount3] = useState(0);
  const [isImportDataTotalCount3, setIsImportDataTotalCount3] = useState(0);
  const [isImportDataProgress3, setIsImportDataProgress3] = useState(0);
  const [isImportDataStatus3, setIsImportDataStatus3] = useState("");
  const [isImportDataMessage3, setIsImportDataMessage3] = useState("");
  const [isImportDataError4, setIsImportDataError4] = useState("");
  const [isImportDataSuccess4, setIsImportDataSuccess4] = useState("");
  const [isImportDataLoading4, setIsImportDataLoading4] = useState(false);
  const [isImportDataTotal4, setIsImportDataTotal4] = useState(0);
  const [isImportDataSuccessCount4, setIsImportDataSuccessCount4] = useState(0);
  const [isImportDataErrorCount4, setIsImportDataErrorCount4] = useState(0);
  const [isImportDataTotalCount4, setIsImportDataTotalCount4] = useState(0);
  const [isImportDataProgress4, setIsImportDataProgress4] = useState(0);
  const [isImportDataStatus4, setIsImportDataStatus4] = useState("");
  const [isImportDataMessage4, setIsImportDataMessage4] = useState("");
  const [isImportDataError5, setIsImportDataError5] = useState("");
  const [isImportDataSuccess5, setIsImportDataSuccess5] = useState("");
  const [isImportDataLoading5, setIsImportDataLoading5] = useState(false);
  const [isImportDataTotal5, setIsImportDataTotal5] = useState(0);
  const [isImportDataSuccessCount5, setIsImportDataSuccessCount5] = useState(0);
  const [isImportDataErrorCount5, setIsImportDataErrorCount5] = useState(0);
  const [isImportDataTotalCount5, setIsImportDataTotalCount5] = useState(0);
  const [isImportDataProgress5, setIsImportDataProgress5] = useState(0);
  const [isImportDataStatus5, setIsImportDataStatus5] = useState("");
  const [isImportDataMessage5, setIsImportDataMessage5] = useState("");
  const [isImportDataError6, setIsImportDataError6] = useState("");
  const [isImportDataSuccess6, setIsImportDataSuccess6] = useState("");
  const [isImportDataLoading6, setIsImportDataLoading6] = useState(false);
  const [isImportDataTotal6, setIsImportDataTotal6] = useState(0);
  const [isImportDataSuccessCount6, setIsImportDataSuccessCount6] = useState(0);
  const [isImportDataErrorCount6, setIsImportDataErrorCount6] = useState(0);
  const [isImportDataTotalCount6, setIsImportDataTotalCount6] = useState(0);
  const [isImportDataProgress6, setIsImportDataProgress6] = useState(0);
  const [isImportDataStatus6, setIsImportDataStatus6] = useState("");
  const [isImportDataMessage6, setIsImportDataMessage6] = useState("");
  const [isImportDataError7, setIsImportDataError7] = useState("");
  const [isImportDataSuccess7, setIsImportDataSuccess7] = useState("");
  const [isImportDataLoading7, setIsImportDataLoading7] = useState(false);
  const [isImportDataTotal7, setIsImportDataTotal7] = useState(0);
  const [isImportDataSuccessCount7, setIsImportDataSuccessCount7] = useState(0);
  const [isImportDataErrorCount7, setIsImportDataErrorCount7] = useState(0);
  const [isImportDataTotalCount7, setIsImportDataTotalCount7] = useState(0);
  const [isImportDataProgress7, setIsImportDataProgress7] = useState(0);
  const [isImportDataStatus7, setIsImportDataStatus7] = useState("");
  const [isImportDataMessage7, setIsImportDataMessage7] = useState("");
  const [isImportDataError8, setIsImportDataError8] = useState("");
  const [isImportDataSuccess8, setIsImportDataSuccess8] = useState("");
  const [isImportDataLoading8, setIsImportDataLoading8] = useState(false);
  const [isImportDataTotal8, setIsImportDataTotal8] = useState(0);
  const [isImportDataSuccessCount8, setIsImportDataSuccessCount8] = useState(0);
  const [isImportDataErrorCount8, setIsImportDataErrorCount8] = useState(0);
  const [isImportDataTotalCount8, setIsImportDataTotalCount8] = useState(0);
  const [isImportDataProgress8, setIsImportDataProgress8] = useState(0);
  const [isImportDataStatus8, setIsImportDataStatus8] = useState("");
  const [isImportDataMessage8, setIsImportDataMessage8] = useState("");
  const [isImportDataError9, setIsImportDataError9] = useState("");
  const [isImportDataSuccess9, setIsImportDataSuccess9] = useState("");
  const [isImportDataLoading9, setIsImportDataLoading9] = useState(false);
  const [isImportDataTotal9, setIsImportDataTotal9] = useState(0);
  const [isImportDataSuccessCount9, setIsImportDataSuccessCount9] = useState(0);
  const [isImportDataErrorCount9, setIsImportDataErrorCount9] = useState(0);
  const [isImportDataTotalCount9, setIsImportDataTotalCount9] = useState(0);
  const [isImportDataProgress9, setIsImportDataProgress9] = useState(0);
  const [isImportDataStatus9, setIsImportDataStatus9] = useState("");
  const [isImportDataMessage9, setIsImportDataMessage9] = useState("");
  const [isImportDataError10, setIsImportDataError10] = useState("");
  const [isImportDataSuccess10, setIsImportDataSuccess10] = useState("");
  const [isImportDataLoading10, setIsImportDataLoading10] = useState(false);
  const [isImportDataTotal10, setIsImportDataTotal10] = useState(0);
  const [isImportDataSuccessCount10, setIsImportDataSuccessCount10] = useState(0);
  const [isImportDataErrorCount10, setIsImportDataErrorCount10] = useState(0);
  const [isImportDataTotalCount10, setIsImportDataTotalCount10] = useState(0);
  const [isImportDataProgress10, setIsImportDataProgress10] = useState(0);
  const [isImportDataStatus10, setIsImportDataStatus10] = useState("");
  const [isImportDataMessage10, setIsImportDataMessage10] = useState("");
  const [isImportDataError11, setIsImportDataError11] = useState("");
  const [isImportDataSuccess11, setIsImportDataSuccess11] = useState("");
  const [isImportDataLoading11, setIsImportDataLoading11] = useState(false);
  const [isImportDataTotal11, setIsImportDataTotal11] = useState(0);
  const [isImportDataSuccessCount11, setIsImportDataSuccessCount11] = useState(0);
  const [isImportDataErrorCount11, setIsImportDataErrorCount11] = useState(0);
  const [isImportDataTotalCount11, setIsImportDataTotalCount11] = useState(0);
  const [isImportDataProgress11, setIsImportDataProgress11] = useState(0);
  const [isImportDataStatus11, setIsImportDataStatus11] = useState("");
  const [isImportDataMessage11, setIsImportDataMessage11] = useState("");
  const [isImportDataError12, setIsImportDataError12] = useState("");
  const [isImportDataSuccess12, setIsImportDataSuccess12] = useState("");
  const [isImportDataLoading12, setIsImportDataLoading12] = useState(false);
  const [isImportDataTotal12, setIsImportDataTotal12] = useState(0);
  const [isImportDataSuccessCount12, setIsImportDataSuccessCount12] = useState(0);
  const [isImportDataErrorCount12, setIsImportDataErrorCount12] = useState(0);
  const [isImportDataTotalCount12, setIsImportDataTotalCount12] = useState(0);
  const [isImportDataProgress12, setIsImportDataProgress12] = useState(0);
  const [isImportDataStatus12, setIsImportDataStatus12] = useState("");
  const [isImportDataMessage12, setIsImportDataMessage12] = useState("");
  const [isImportDataError13, setIsImportDataError13] = useState("");
  const [isImportDataSuccess13, setIsImportDataSuccess13] = useState("");
  const [isImportDataLoading13, setIsImportDataLoading13] = useState(false);
  const [isImportDataTotal13, setIsImportDataTotal13] = useState(0);
  const [isImportDataSuccessCount13, setIsImportDataSuccessCount13] = useState(0);
  const [isImportDataErrorCount13, setIsImportDataErrorCount13] = useState(0);
  const [isImportDataTotalCount13, setIsImportDataTotalCount13] = useState(0);
  const [isImportDataProgress13, setIsImportDataProgress13] = useState(0);
  const [isImportDataStatus13, setIsImportDataStatus13] = useState("");
  const [isImportDataMessage13, setIsImportDataMessage13] = useState("");
  const [isImportDataError14, setIsImportDataError14] = useState("");
  const [isImportDataSuccess14, setIsImportDataSuccess14] = useState("");
  const [isImportDataLoading14, setIsImportDataLoading14] = useState(false);
  const [isImportDataTotal14, setIsImportDataTotal14] = useState(0);
  const [isImportDataSuccessCount14, setIsImportDataSuccessCount14] = useState(0);
  const [isImportDataErrorCount14, setIsImportDataErrorCount14] = useState(0);
  const [isImportDataTotalCount14, setIsImportDataTotalCount14] = useState(0);
  const [isImportDataProgress14, setIsImportDataProgress14] = useState(0);
  const [isImportDataStatus14, setIsImportDataStatus14] = useState("");
  const [isImportDataMessage14, setIsImportDataMessage14] = useState("");
  const [isImportDataError15, setIsImportDataError15] = useState("");
  const [isImportDataSuccess15, setIsImportDataSuccess15] = useState("");
  const [isImportDataLoading15, setIsImportDataLoading15] = useState(false);
  const [isImportDataTotal15, setIsImportDataTotal15] = useState(0);
  const [isImportDataSuccessCount15, setIsImportDataSuccessCount15] = useState(0);
  const [isImportDataErrorCount15, setIsImportDataErrorCount15] = useState(0);
  const [isImportDataTotalCount15, setIsImportDataTotalCount15] = useState(0);
  const [isImportDataProgress15, setIsImportDataProgress15] = useState(0);
  const [isImportDataStatus15, setIsImportDataStatus15] = useState("");
  const [isImportDataMessage15, setIsImportDataMessage15] = useState("");
  const [isImportDataError16, setIsImportDataError16] = useState("");
  const [isImportDataSuccess16, setIsImportDataSuccess16] = useState("");
  const [isImportDataLoading16, setIsImportDataLoading16] = useState(false);
  const [isImportDataTotal16, setIsImportDataTotal16] = useState(0);
  const [isImportDataSuccessCount16, setIsImportDataSuccessCount16] = useState(0);
  const [isImportDataErrorCount16, setIsImportDataErrorCount16] = useState(0);
  const [isImportDataTotalCount16, setIsImportDataTotalCount16] = useState(0);
  const [isImportDataProgress16, setIsImportDataProgress16] = useState(0);
  const [isImportDataStatus16, setIsImportDataStatus16] = useState("");
  const [isImportDataMessage16, setIsImportDataMessage16] = useState("");
  const [isImportDataError17, setIsImportDataError17] = useState("");
  const [isImportDataSuccess17, setIsImportDataSuccess17] = useState("");
  const [isImportDataLoading17, setIsImportDataLoading17] = useState(false);
  const [isImportDataTotal17, setIsImportDataTotal17] = useState(0);
  const [isImportDataSuccessCount17, setIsImportDataSuccessCount17] = useState(0);
  const [isImportDataErrorCount17, setIsImportDataErrorCount17] = useState(0);
  const [isImportDataTotalCount17, setIsImportDataTotalCount17] = useState(0);
  const [isImportDataProgress17, setIsImportDataProgress17] = useState(0);
  const [isImportDataStatus17, setIsImportDataStatus17] = useState("");
  const [isImportDataMessage17, setIsImportDataMessage17] = useState("");
  const [isImportDataError18, setIsImportDataError18] = useState("");
  const [isImportDataSuccess18, setIsImportDataSuccess18] = useState("");
  const [isImportDataLoading18, setIsImportDataLoading18] = useState(false);
  const [isImportDataTotal18, setIsImportDataTotal18] = useState(0);
  const [isImportDataSuccessCount18, setIsImportDataSuccessCount18] = useState(0);
  const [isImportDataErrorCount18, setIsImportDataErrorCount18] = useState(0);
  const [isImportDataTotalCount18, setIsImportDataTotalCount18] = useState(0);
  const [isImportDataProgress18, setIsImportDataProgress18] = useState(0);
  const [isImportDataStatus18, setIsImportDataStatus18] = useState("");
  const [isImportDataMessage18, setIsImportDataMessage18] = useState("");
  const [isImportDataError19, setIsImportDataError19] = useState("");
  const [isImportDataSuccess19, setIsImportDataSuccess19] = useState("");
  const [isImportDataLoading19, setIsImportDataLoading19] = useState(false);
  const [isImportDataTotal19, setIsImportDataTotal19] = useState(0);
  const [isImportDataSuccessCount19, setIsImportDataSuccessCount19] = useState(0);
  const [isImportDataErrorCount19, setIsImportDataErrorCount19] = useState(0);
  const [isImportDataTotalCount19, setIsImportDataTotalCount19] = useState(0);
  const [isImportDataProgress19, setIsImportDataProgress19] = useState(0);
  const [isImportDataStatus19, setIsImportDataStatus19] = useState("");
  const [isImportDataMessage19, setIsImportDataMessage19] = useState("");
  const [isImportDataError20, setIsImportDataError20] = useState("");
  const [isImportDataSuccess20, setIsImportDataSuccess20] = useState("");
  const [isImportDataLoading20, setIsImportDataLoading20] = useState(false);
  const [isImportDataTotal20, setIsImportDataTotal20] = useState(0);
  const [isImportDataSuccessCount20, setIsImportDataSuccessCount20] = useState(0);
  const [isImportDataErrorCount20, setIsImportDataErrorCount20] = useState(0);
  const [isImportDataTotalCount20, setIsImportDataTotalCount20] = useState(0);
  const [isImportDataProgress20, setIsImportDataProgress20] = useState(0);
  const [isImportDataStatus20, setIsImportDataStatus20] = useState("");
  const [isImportDataMessage20, setIsImportDataMessage20] = useState("");

  useEffect(() => {
    if (props.tourData) {
      dispatch(saveTourSteps(props.tourData));
    }
    // eslint-disable-next-line
  }, [props.tourData]);

  const handleAction = (action, data, subaction) => {
    switch (action) {
      case "redirect":
        navigate(`/${subaction.redirectUrl}?docId=${data.objectId}`);
        break;
      case "delete":
        setIsDelete({ status: true, data: data });
        break;
      case "rename":
        setIsRename({ status: true, data: data });
        break;
      case "share":
        handleShare(data);
        break;
      case "resend":
        setIsResend({ status: true, data: data });
        break;
      case "revoke":
        setIsRevoke({ status: true, data: data });
        break;
      case "extendexpiry":
        setIsExtendExpiry({ status: true, data: data });
        break;
      case "saveastemplate":
        handleSaveAsTemplate(data);
        break;
      case "recreatedocument":
        setIsRecreate({ status: true, data: data });
        break;
      default:
        break;
    }
  };

  const handleShare = (data) => {
    const baseUrl = window.location.origin;
    const docId = data.objectId;
    const signers = data.Signers;
    const placeholders = data.Placeholders;
    const isSigners = signers && signers.length > 0;
    const isPlaceholders = placeholders && placeholders.length > 0;
    if (isSigners && isPlaceholders) {
      const signerEmail = signers[0].Email;
      const signerObjId = signers[0].objectId;
      const encodeBase64 = btoa(`${docId}/${signerEmail}/${signerObjId}`);
      const url = `${baseUrl}/login/${encodeBase64}`;
      setShareUrl(url);
      setIsShareModal({ status: true, data: data });
    } else {
      alert(t("share-alert"));
    }
  };

  const handleSaveAsTemplate = async (data) => {
    setIsLoader(true);
    try {
      const params = { docId: data.objectId };
      const res = await Parse.Cloud.run("saveastemplate", params);
      if (res) {
        alert(t("template-saved-alert"));
      }
    } catch (err) {
      console.log("Err in save as template", err);
      alert(t("something-went-wrong-mssg"));
    } finally {
      setIsLoader(false);
    }
  };

  const handleRenameDoc = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    try {
      const docId = isRename.data.objectId;
      const docCls = isRename.data.TemplateId ? "contracts_Template" : "contracts_Document";
      const docQuery = new Parse.Object(docCls);
      docQuery.id = docId;
      docQuery.set("Name", isRename.data.Name);
      const res = await docQuery.save();
      if (res) {
        const updateList = props.List.map((x) =>
          x.objectId === docId ? { ...x, Name: isRename.data.Name } : x
        );
        props.setList(updateList);
        setIsRename({});
      }
    } catch (err) {
      console.log("Err in rename doc", err);
      alert(t("something-went-wrong-mssg"));
    } finally {
      setIsLoader(false);
    }
  };

  const handleDeleteDoc = async () => {
    setIsLoader(true);
    try {
      const docId = isDelete.data.objectId;
      const docCls = isDelete.data.TemplateId ? "contracts_Template" : "contracts_Document";
      const docQuery = new Parse.Object(docCls);
      docQuery.id = docId;
      docQuery.set("IsArchive", true);
      const res = await docQuery.save();
      if (res) {
        const updateList = props.List.filter((x) => x.objectId !== docId);
        props.setList(updateList);
        setIsDelete({});
      }
    } catch (err) {
      console.log("Err in delete doc", err);
      alert(t("something-went-wrong-mssg"));
    } finally {
      setIsLoader(false);
    }
  };

  const handleResendDoc = async () => {
    setIsLoader(true);
    try {
      const docId = isResend.data.objectId;
      const docCls = "contracts_Document";
      const docQuery = new Parse.Object(docCls);
      docQuery.id = docId;
      docQuery.set("SendMail", true);
      const res = await docQuery.save();
      if (res) {
        alert(t("resend-alert"));
        setIsResend({});
      }
    } catch (err) {
      console.log("Err in resend doc", err);
      alert(t("something-went-wrong-mssg"));
    } finally {
      setIsLoader(false);
    }
  };

  const handleRevokeDoc = async () => {
    setIsLoader(true);
    try {
      const docId = isRevoke.data.objectId;
      const docCls = "contracts_Document";
      const docQuery = new Parse.Object(docCls);
      docQuery.id = docId;
      docQuery.set("IsArchive", true);
      const res = await docQuery.save();
      if (res) {
        const updateList = props.List.filter((x) => x.objectId !== docId);
        props.setList(updateList);
        setIsRevoke({});
      }
    } catch (err) {
      console.log("Err in revoke doc", err);
      alert(t("something-went-wrong-mssg"));
    } finally {
      setIsLoader(false);
    }
  };

  const handleExtendExpiry = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    try {
      const docId = isExtendExpiry.data.objectId;
      const docCls = "contracts_Document";
      const docQuery = new Parse.Object(docCls);
      docQuery.id = docId;
      const date = new Date(expiryDate);
      docQuery.set("ExpiryDate", date);
      const res = await docQuery.save();
      if (res) {
        const updateList = props.List.map((x) =>
          x.objectId === docId ? { ...x, ExpiryDate: { iso: date.toISOString() } } : x
        );
        props.setList(updateList);
        setIsExtendExpiry({});
        setExpiryDate("");
      }
    } catch (err) {
      console.log("Err in extend expiry", err);
      alert(t("something-went-wrong-mssg"));
    } finally {
      setIsLoader(false);
    }
  };

  const handleRecreateDoc = async () => {
    setIsLoader(true);
    try {
      const params = { docId: isRecreate.data.objectId };
      const res = await Parse.Cloud.run("recreatedoc", params);
      if (res) {
        navigate(`/placeHolderSign/${res.objectId}`);
      }
    } catch (err) {
      console.log("Err in recreate doc", err);
      alert(t("something-went-wrong-mssg"));
    } finally {
      setIsLoader(false);
      setIsRecreate({});
    }
  };

  const handleBulkSendClose = (status, count) => {
    setIsBulkSend({});
    if (status === "success") {
      alert(`${count} ${t("document-created-alert")}`);
    } else {
      alert(t("something-went-wrong-mssg"));
    }
  };

  const handleShareWithTeam = async () => {
    setIsLoader(true);
    try {
      const templateId = isShareWith.data.objectId;
      const teamQuery = new Parse.Query("contracts_Teams");
      teamQuery.equalTo("Name", "All Users");
      const teamRes = await teamQuery.first();
      if (teamRes) {
        const _teamRes = JSON.parse(JSON.stringify(teamRes));
        const templateQuery = new Parse.Object("contracts_Template");
        templateQuery.id = templateId;
        templateQuery.set("SharedWith", [
          {
            __type: "Pointer",
            className: "contracts_Teams",
            objectId: _teamRes.objectId,
          },
        ]);
        const res = await templateQuery.save();
        if (res) {
          alert(t("template-shared-alert"));
          setIsShareWith({});
        }
      }
    } catch (err) {
      console.log("Err in share with team", err);
      alert(t("something-went-wrong-mssg"));
    } finally {
      setIsLoader(false);
    }
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "text/csv") {
        setImportFile(file);
        setIsImportError("");
      } else {
        setIsImportError(t("import-error-1"));
        setImportFile(null);
      }
    }
  };

  const handleImportContacts = async (e) => {
    e.preventDefault();
    if (importFile) {
      setIsImportLoader(true);
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const text = e.target.result;
          const lines = text.split("\n");
          const headers = lines[0].split(",");
          const nameIndex = headers.findIndex(
            (header) => header.toLowerCase().trim() === "name"
          );
          const emailIndex = headers.findIndex(
            (header) => header.toLowerCase().trim() === "email"
          );
          const phoneIndex = headers.findIndex(
            (header) => header.toLowerCase().trim() === "phone"
          );
          if (nameIndex === -1 || emailIndex === -1) {
            setIsImportError(t("import-error-2"));
            setIsImportLoader(false);
            return;
          }
          const contacts = [];
          for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === "") continue;
            const values = lines[i].split(",");
            const name = values[nameIndex]?.trim();
            const email = values[emailIndex]?.trim();
            const phone = phoneIndex !== -1 ? values[phoneIndex]?.trim() : "";
            if (name && email) {
              contacts.push({
                Name: name,
                Email: email,
                Phone: phone,
                TenantId: localStorage.getItem("TenantId"),
              });
            }
          }
          if (contacts.length > 0) {
            const params = { contacts: JSON.stringify(contacts) };
            const res = await Parse.Cloud.run("createbatchcontact", params);
            if (res) {
              setIsImportSuccess(
                `${t("import-success-1")} ${res.success} ${t("import-success-2")} ${
                  res.failed
                } ${t("import-success-3")}`
              );
              setImportFile(null);
              setTimeout(() => {
                setIsImport(false);
                setIsImportSuccess("");
                setIsImportError("");
              }, 3000);
            }
          } else {
            setIsImportError(t("import-error-3"));
          }
        };
        reader.readAsText(importFile);
      } catch (err) {
        console.log("Err in import contacts", err);
        setIsImportError(t("something-went-wrong-mssg"));
      } finally {
        setIsImportLoader(false);
      }
    } else {
      setIsImportError(t("import-error-4"));
    }
  };

  return (
    <div className="bg-base-100 text-base-content rounded-box w-full shadow-md">
      {isLoader && (
        <div className="absolute w-full h-full flex justify-center items-center bg-black/30 z-30 rounded-box">
          <Loader />
        </div>
      )}
      <div className="flex flex-row items-center justify-between my-2 mx-3 text-[20px] md:text-[23px]">
        <div className="font-light">
          {props.ReportName}{" "}
          {props.report_help && (
            <span className="text-xs md:text-[13px] font-normal">
              <i
                className="fa-light fa-circle-question cursor-pointer"
                title={props.report_help}
              ></i>
            </span>
          )}
        </div>
        <div className="flex flex-row gap-2 items-center">
          {props.isImport && (
            <div
              className="cursor-pointer"
              onClick={() => setIsImport(true)}
              title={t("import")}
            >
              <i className="fa-light fa-file-import text-accent text-[30px] md:text-[40px]"></i>
            </div>
          )}
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="op-table border-collapse w-full mb-[50px]">
          <thead className="text-[14px]">
            <tr className="border-y-[1px]">
              {props.heading?.map((item, index) => (
                <th key={index} className="px-4 py-2">
                  {t(`report-heading.${item}`)}
                </th>
              ))}
              <th className="px-4 py-2">{t("action")}</th>
            </tr>
          </thead>
          {props.List?.length > 0 && (
            <tbody className="text-[12px]">
              {props.List.map((item, index) => (
                <tr className="border-y-[1px]" key={index}>
                  {props.heading.includes("Title") && (
                    <td className="px-4 py-2 font-semibold">
                      {item?.Name}{" "}
                      {item?.IsSignyourself && (
                        <span className="op-badge op-badge-primary">
                          {t("sign-yourself")}
                        </span>
                      )}
                    </td>
                  )}
                  {props.heading.includes("Note") && (
                    <td className="px-4 py-2">{item?.Note || "-"}</td>
                  )}
                  {props.heading.includes("Reason") && (
                    <td className="px-4 py-2">{item?.DeclineReason || "-"}</td>
                  )}
                  {props.heading.includes("Folder") && (
                    <td className="px-4 py-2">
                      {item?.Folder?.Name ? item?.Folder?.Name : "-"}
                    </td>
                  )}
                  {props.heading.includes("File") && (
                    <td className="px-4 py-2">
                      {item?.URL ? (
                        <i
                          className="fa-light fa-file-pdf text-[red] text-[20px]"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        "-"
                      )}
                    </td>
                  )}
                  {props.heading.includes("Owner") && (
                    <td className="px-4 py-2">
                      {item?.ExtUserPtr?.Name || "-"}
                    </td>
                  )}
                  {props.heading.includes("Signers") && (
                    <td className="px-4 py-2">
                      {item?.Signers?.length > 0
                        ? item?.Signers.map((signer) => signer.Name).join(", ")
                        : "-"}
                    </td>
                  )}
                  {props.heading.includes("Email") && (
                    <td className="px-4 py-2">{item?.Email || "-"}</td>
                  )}
                  {props.heading.includes("Phone") && (
                    <td className="px-4 py-2">{item?.Phone || "-"}</td>
                  )}
                  {props.heading.includes("Name") && (
                    <td className="px-4 py-2">{item?.Name || "-"}</td>
                  )}
                  <td className="px-4 py-2">
                    <div className="flex flex-row gap-1">
                      {props.actions.map((action, i) => {
                        if (action.action === "option") {
                          return (
                            <div
                              key={i}
                              data-tut={action.selector}
                              className="relative"
                            >
                              <button
                                className={`op-btn op-btn-sm ${
                                  action.btnColor
                                    ? action.btnColor
                                    : "op-btn-ghost"
                                } ${
                                  action.restrictBtn &&
                                  item?.IsSignyourself &&
                                  "hidden"
                                }`}
                                onClick={() =>
                                  setIsOption({
                                    status: true,
                                    data: item,
                                    action: action,
                                  })
                                }
                                title={action.hoverLabel}
                              >
                                <i
                                  className={`${action.btnIcon}`}
                                  style={{
                                    color: action.textColor
                                      ? action.textColor
                                      : "",
                                  }}
                                  aria-hidden="true"
                                ></i>
                              </button>
                              {isOption.status &&
                                isOption.data.objectId === item.objectId && (
                                  <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                      {action.subaction.map((subaction, j) => {
                                        return (
                                          <div
                                            key={j}
                                            className={`${
                                              subaction.restrictBtn &&
                                              item?.IsSignyourself &&
                                              "hidden"
                                            }`}
                                          >
                                            <button
                                              className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                              onClick={() => {
                                                setIsOption({});
                                                handleAction(
                                                  subaction.action,
                                                  item,
                                                  subaction
                                                );
                                              }}
                                              title={subaction.hoverLabel}
                                            >
                                              <i
                                                className={`${subaction.btnIcon} mr-2`}
                                                aria-hidden="true"
                                              ></i>
                                              {t(
                                                `report-action.${subaction.btnLabel}`
                                              )}
                                            </button>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                            </div>
                          );
                        } else if (action.action === "edit") {
                          return (
                            <button
                              key={i}
                              className={`op-btn op-btn-sm ${
                                action.btnColor ? action.btnColor : "op-btn-ghost"
                              }`}
                              onClick={() => {
                                setIsRename({
                                  status: true,
                                  data: { ...item },
                                });
                              }}
                              title={action.hoverLabel}
                            >
                              <i
                                className={`${action.btnIcon}`}
                                aria-hidden="true"
                              ></i>
                            </button>
                          );
                        } else if (action.action === "delete") {
                          return (
                            <button
                              key={i}
                              className={`op-btn op-btn-sm ${
                                action.btnColor ? action.btnColor : "op-btn-ghost"
                              } ${
                                action.restrictBtn &&
                                item?.IsSignyourself &&
                                "hidden"
                              }`}
                              onClick={() =>
                                setIsDelete({ status: true, data: item })
                              }
                              title={action.hoverLabel}
                            >
                              <i
                                className={`${action.btnIcon}`}
                                aria-hidden="true"
                              ></i>
                            </button>
                          );
                        } else if (action.action === "bulksend") {
                          return (
                            <button
                              key={i}
                              data-tut={action.selector}
                              className={`op-btn op-btn-sm ${
                                action.btnColor ? action.btnColor : "op-btn-ghost"
                              }`}
                              onClick={() =>
                                setIsBulkSend({ status: true, data: item })
                              }
                              title={action.hoverLabel}
                            >
                              <i
                                className={`${action.btnIcon}`}
                                aria-hidden="true"
                              ></i>
                              <span className="hidden md:inline ml-1">
                                {action.btnLabel}
                              </span>
                            </button>
                          );
                        } else {
                          return (
                            <button
                              key={i}
                              data-tut={action.selector}
                              className={`op-btn op-btn-sm ${
                                action.btnColor ? action.btnColor : "op-btn-ghost"
                              } ${
                                action.restrictBtn &&
                                item?.IsSignyourself &&
                                "hidden"
                              }`}
                              onClick={() =>
                                handleAction(action.action, item, action)
                              }
                              title={action.hoverLabel}
                            >
                              <i
                                className={`${action.btnIcon}`}
                                aria-hidden="true"
                              ></i>
                              {action.btnLabel && (
                                <span className="hidden md:inline ml-1">
                                  {action.btnLabel}
                                </span>
                              )}
                            </button>
                          );
                        }
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {props.List?.length > 0 && props.isMoreDocs && (
        <div className="flex justify-center mb-3">
          <button
            className="op-btn op-btn-primary op-btn-sm"
            onClick={() => props.setIsNextRecord(true)}
          >
            {t("load-more")}
          </button>
        </div>
      )}
      {props.List?.length <= 0 && (
        <div
          className={`${
            props.isDashboard ? "h-[317px]" : ""
          } flex flex-col items-center justify-center w-ful bg-base-100 text-base-content rounded-xl py-4`}
        >
          <div className="w-[60px] h-[60px] overflow-hidden">
            <img
              className="w-full h-full object-contain"
              src={pad}
              alt="img"
            />
          </div>
          <div className="text-sm font-semibold">
            {t("no-data-avaliable")}
          </div>
        </div>
      )}
      <ModalUi
        isOpen={isRename.status}
        title={t("rename-document")}
        handleClose={() => setIsRename({})}
      >
        <div className="h-full p-[20px]">
          <form onSubmit={handleRenameDoc}>
            <div className="mb-3">
              <label className="block text-xs font-semibold">
                {t("name")}
                <span className="text-[red] text-[13px]"> *</span>
              </label>
              <input
                type="text"
                value={isRename.data?.Name}
                onChange={(e) =>
                  setIsRename({
                    ...isRename,
                    data: { ...isRename.data, Name: e.target.value },
                  })
                }
                className="op-input op-input-bordered op-input-sm focus:outline-none hover:border-base-content w-full text-xs"
                required
              />
            </div>
            <div className="h-[1px] w-full bg-[#9f9f9f] my-[15px]"></div>
            <button type="submit" className="op-btn op-btn-primary">
              {t("save")}
            </button>
            <button
              type="button"
              className="op-btn op-btn-ghost ml-2"
              onClick={() => setIsRename({})}
            >
              {t("cancel")}
            </button>
          </form>
        </div>
      </ModalUi>
      <ModalUi
        isOpen={isDelete.status}
        title={t("delete-document")}
        handleClose={() => setIsDelete({})}
      >
        <div className="h-full p-[20px]">
          <p>{t("delete-document-alert")}</p>
          <div className="h-[1px] w-full bg-[#9f9f9f] my-[15px]"></div>
          <button
            onClick={() => handleDeleteDoc()}
            type="button"
            className="op-btn op-btn-primary"
          >
            {t("yes")}
          </button>
          <button
            onClick={() => setIsDelete({})}
            type="button"
            className="op-btn op-btn-ghost ml-2"
          >
            {t("no")}
          </button>
        </div>
      </ModalUi>
      <ModalUi
        isOpen={isResend.status}
        title={t("resend-document")}
        handleClose={() => setIsResend({})}
      >
        <div className="h-full p-[20px]">
          <p>{t("resend-document-alert")}</p>
          <div className="h-[1px] w-full bg-[#9f9f9f] my-[15px]"></div>
          <button
            onClick={() => handleResendDoc()}
            type="button"
            className="op-btn op-btn-primary"
          >
            {t("yes")}
          </button>
          <button
            onClick={() => setIsResend({})}
            type="button"
            className="op-btn op-btn-ghost ml-2"
          >
            {t("no")}
          </button>
        </div>
      </ModalUi>
      <ModalUi
        isOpen={isRevoke.status}
        title={t("revoke-document")}
        handleClose={() => setIsRevoke({})}
      >
        <div className="h-full p-[20px]">
          <p>{t("revoke-document-alert")}</p>
          <div className="h-[1px] w-full bg-[#9f9f9f] my-[15px]"></div>
          <button
            onClick={() => handleRevokeDoc()}
            type="button"
            className="op-btn op-btn-primary"
          >
            {t("yes")}
          </button>
          <button
            onClick={() => setIsRevoke({})}
            type="button"
            className="op-btn op-btn-ghost ml-2"
          >
            {t("no")}
          </button>
        </div>
      </ModalUi>
      <ModalUi
        isOpen={isExtendExpiry.status}
        title={t("extend-expiry")}
        handleClose={() => setIsExtendExpiry({})}
      >
        <div className="h-full p-[20px]">
          <form onSubmit={handleExtendExpiry}>
            <div className="mb-3">
              <label className="block text-xs font-semibold">
                {t("expiry-date")}
                <span className="text-[red] text-[13px]"> *</span>
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="op-input op-input-bordered op-input-sm focus:outline-none hover:border-base-content w-full text-xs"
                required
              />
            </div>
            <div className="h-[1px] w-full bg-[#9f9f9f] my-[15px]"></div>
            <button type="submit" className="op-btn op-btn-primary">
              {t("save")}
            </button>
            <button
              type="button"
              className="op-btn op-btn-ghost ml-2"
              onClick={() => setIsExtendExpiry({})}
            >
              {t("cancel")}
            </button>
          </form>
        </div>
      </ModalUi>
      <ModalUi
        isOpen={isShareModal.status}
        title={t("share-document")}
        handleClose={() => setIsShareModal({})}
      >
        <div className="h-full p-[20px]">
          <p>{t("share-document-alert")}</p>
          <div className="flex flex-row items-center mt-3">
            <input
              type="text"
              value={shareUrl}
              className="op-input op-input-bordered op-input-sm focus:outline-none hover:border-base-content w-full text-xs"
              readOnly
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                alert(t("copied"));
              }}
              type="button"
              className="op-btn op-btn-primary ml-2"
            >
              <i className="fa-light fa-copy" aria-hidden="true"></i>
            </button>
          </div>
          <div className="h-[1px] w-full bg-[#9f9f9f] my-[15px]"></div>
          <button
            onClick={() => setIsShareModal({})}
            type="button"
            className="op-btn op-btn-ghost"
          >
            {t("close")}
          </button>
        </div>
      </ModalUi>
      <ModalUi
        isOpen={isRecreate.status}
        title={t("recreate-document")}
        handleClose={() => setIsRecreate({})}
      >
        <div className="h-full p-[20px]">
          <p>{t("recreate-document-alert")}</p>
          <div className="h-[1px] w-full bg-[#9f9f9f] my-[15px]"></div>
          <button
            onClick={() => handleRecreateDoc()}
            type="button"
            className="op-btn op-btn-primary"
          >
            {t("yes")}
          </button>
          <button
            onClick={() => setIsRecreate({})}
            type="button"
            className="op-btn op-btn-ghost ml-2"
          >
            {t("no")}
          </button>
        </div>
      </ModalUi>
      <ModalUi
        isOpen={isBulkSend.status}
        title={t("quick-send")}
        handleClose={() => setIsBulkSend({})}
      >
        <div className="h-full p-[20px] relative">
          <BulkSendUi
            item={isBulkSend.data}
            Placeholders={isBulkSend.data?.Placeholders}
            handleClose={handleBulkSendClose}
            signatureType={isBulkSend.data?.SignatureType}
          />
        </div>
      </ModalUi>
      <ModalUi
        isOpen={isShareWith.status}
        title={t("share-with-team")}
        handleClose={() => setIsShareWith({})}
      >
        <div className="h-full p-[20px]">
          <p>{t("share-with-team-alert")}</p>
          <div className="h-[1px] w-full bg-[#9f9f9f] my-[15px]"></div>
          <button
            onClick={() => handleShareWithTeam()}
            type="button"
            className="op-btn op-btn-primary"
          >
            {t("yes")}
          </button>
          <button
            onClick={() => setIsShareWith({})}
            type="button"
            className="op-btn op-btn-ghost ml-2"
          >
            {t("no")}
          </button>
        </div>
      </ModalUi>
      <ModalUi
        isOpen={isImport}
        title={t("import-contacts")}
        handleClose={() => {
          setIsImport(false);
          setImportFile(null);
          setIsImportError("");
          setIsImportSuccess("");
        }}
      >
        <div className="h-full p-[20px]">
          {isImportLoader ? (
            <div className="h-[200px] flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <form onSubmit={handleImportContacts}>
              <div className="mb-3">
                <label className="block text-xs font-semibold">
                  {t("csv-file")}
                  <span className="text-[red] text-[13px]"> *</span>
                </label>
                <input
                  type="file"
                  onChange={handleImportFile}
                  className="op-file-input op-file-input-bordered op-file-input-sm focus:outline-none hover:border-base-content w-full text-xs"
                  accept=".csv"
                  required
                />
                {isImportError && (
                  <p className="text-[red] text-[12px] mt-1">{isImportError}</p>
                )}
                {isImportSuccess && (
                  <p className="text-[green] text-[12px] mt-1">
                    {isImportSuccess}
                  </p>
                )}
              </div>
              <div className="h-[1px] w-full bg-[#9f9f9f] my-[15px]"></div>
              <button type="submit" className="op-btn op-btn-primary">
                {t("import")}
              </button>
              <button
                type="button"
                className="op-btn op-btn-ghost ml-2"
                onClick={() => {
                  setIsImport(false);
                  setImportFile(null);
                  setIsImportError("");
                  setIsImportSuccess("");
                }}
              >
                {t("cancel")}
              </button>
            </form>
          )}
        </div>
      </ModalUi>
      {isDownloading === "pdf" && (
        <div className="fixed z-[200] inset-0 flex justify-center items-center bg-black bg-opacity-30">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default GetReportDisplay;