export class Base64ToFileDownload {
  // Example base64 string (you would have your own base64 data here)
  //private base64String = 'data:text/plain;base64,SGVsbG8gd29ybGQh'; // Base64 for "Hello world!"

  public static downloadFile(base64String:string, fileName:string): void {
    // Create a Blob object from the base64 string (you may need to adjust the MIME type)
    fileName += ".pdf";
    if (base64String.startsWith("JVB")) {
      base64String = "data:application/pdf;base64," + base64String;
    } else if (base64String.startsWith("data:application/pdf;base64")) {
    } else {
      alert("Not a valid Base64 PDF string. Please check");
    }

    const byteCharacters = atob(base64String.split(",")[1]); // Decode the base64 data
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    // Create a Blob from the byte arrays
    const blob = new Blob(byteArrays, { type: "text/plain" }); // Adjust MIME type if needed
    const blobUrl = URL.createObjectURL(blob);

    // Create an anchor element to trigger the download
    const link = document.createElement("a");
    //link.href = blobUrl;
    link.href = base64String;
    link.download = fileName; // Set the desired file name
    link.click();

    // Clean up the Object URL after download
    URL.revokeObjectURL(blobUrl);
  }
}
