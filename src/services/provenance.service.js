import { BaseService } from './baseService';
import { authService } from './authService';
import FileDownload from 'js-file-download'
import Axios from 'axios';
import * as FileSaver from 'file-saver';
import streamToBlob from 'stream-to-blob'


export class ProvenanceService extends BaseService {
    constructor({ authService }) {
        super();
        this._authService = authService;
    }

    generateSvgProv = ({ jsonProv, options }) => {
        return this._authService.post(this.getBaseURL('users/generateSvgProv'), jsonProv, options)
            .then(response => {
                return response;
            })
            .catch(error => this._handleError(error));
    }

    generateProvN = ({ jsonProv, options }) => {
        return this._authService.post(this.getBaseURL('users/generateProvN'), jsonProv, options)
            .then(response => {
                return response;
            })
            .catch(error => this._handleError(error));
    }
    blobToFile = (theBlob, fileName) => {
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }

    base64ToArrayBuffer = (base64) => {
        const binaryString = window.atob(base64); // Comment this if not using base64
        const bytes = new Uint8Array(binaryString.length);
        return bytes.map((byte, i) => binaryString.charCodeAt(i));
    }

    createAndDownloadBlobFile = (body, filename, extension = 'pdf') => {
        const blob = new Blob([body]);
        const fileName = `${filename}.${extension}`;
        if (navigator.msSaveBlob) {
            // IE 10+
            navigator.msSaveBlob(blob, fileName);
        } else {
            const link = document.createElement('a');
            // Browsers that support HTML5 download attribute
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    saveByteArray = (reportName, byte) => {
        var blob = new Blob([byte], { type: "application/pdf" });
        console.log('====abc ')
        var link = document.createElement('a');
        let url = window.URL.createObjectURL(blob);
        link.href = window.URL.createObjectURL(blob);
        console.log('=== url', url)
        // var fileName = reportName;
        // link.download = fileName;
        // link.click();
    };
    generateProvPDF = ({ jsonProv, options }) => {
        return Axios.post("http://localhost:3004/api/users/generateProvPDF",
            jsonProv,
            {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf'
                }
            })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'dataprovenance.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => console.log(error));
    }

}

export const provenanceService = new ProvenanceService({ authService });
