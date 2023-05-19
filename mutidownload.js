/**
* download a list of files
*/
function download_files(files) {
  function download_next(i) {
    if (i >= files.length) {
      return;
    }
    var a document.createElement('a');
    a.href = files[i].download;
    a.target = '_parent';
    // use a.download if available, it prevents plugins from opening.
    if ('download' in a) {
      a.download = files[i].filename;
    }
    // add a to the doc for click to work.
    (document.body || document.documentElement).appendChild(a);
    if (a.click) {
      a.click(); //click method supported by most browsers
    } else {
      $(a).click(); //backup using jquery
    }
    // delete temp link
    a.parentNode.removeChild(a);
    // download next file with a timeout. timeout is necessary
    // for IE, which will otherise only download the first file
    setTimeout(function() {
      download_next(i + 1);
    }, 500); //timeout set for 500ms
    // Initiate the first download
    download_next(0);
  }
