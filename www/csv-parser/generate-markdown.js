/**
 * @author Bryan Haberberger
 * 
 * File API
 * @see https://www.w3.org/TR/FileAPI/
 * Important Note: While this specification doesn’t provide an explicit API call to trigger downloads, the HTML5 specification has addressed this. 
 * The download attribute of the <a> element initiates a download, saving a File with the name specified. 
 * The combination of this API and the download attribute on <a> elements allows for the creation of files within web applications, and the ability to save them locally.
 * 
 * How To
 * @see https://www.html5rocks.com/en/tutorials/file/filesystem//#toc-fileentry
 */

window.requestFileSystem = window.requestFileSystem ? window.requestFileSystem : window.webkitRequestFileSystem

/**
 * Click event function to create new set of background essays  
 */
async function newBackgroundEssays(event) {
    let r = confirm("This will generate new background essay markdown files.  Any links on the screen will be replaced.")
    if (r == true) {
        let txt = await fetch("./csv-parser/csv/background-essay.csv", {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-Type': 'text/csv;charset=utf-8'
                }
            })
            .then(response => response.text())
            .catch(err => { return new Error("Could not get CSV file") })
        let parsedCSV = await getFromCSVInfo(txt)
        alterFileStructure(parsedCSV, "essays")
        return parsedCSV
    }
}

/**
 * Click event function to create new set of partial transcriptions
 */
async function newPartialTranscriptions(event) {
    let r = confirm("This will generate new partial transcription markdown files.  Any links on the screen will be replaced.")
    if (r == true) {
        let txt = await fetch("./csv-parser/csv/partial-transcriptions.csv", {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-Type': 'text/csv;charset=utf-8'
                }
            })
            .then(response => response.text())
            .catch(err => { return new Error("Could not get CSV file") })
        let parsedCSV = await getFromCSVInfo(txt)
        alterFileStructure(parsedCSV, "transcriptions")
    }
}

/**
 * Add a new folder marked by a timestamp to make the directory unique.
 * Fill that folder with markdown versions of the CSV rows
 * It is available through your local data like filesystem:https://centerfordigitalhumanities.github.io/temporary/
 * You can download it or find it in C:\Users\You\AppData\Local\Google\Chrome\User Data\Default\File System
 */
async function alterFileStructure(parsedCSV, which) {
    console.warn("Attempting file structure magic. Below is your parsed CSV data.")
    console.log(parsedCSV)
    let which_now = "_" + which + "_" + new Date().getTime()

    //For temporary storage
    window.requestFileSystem(window.TEMPORARY, 1024 * 1024, async function(fs) {
        /* Create directory with timestamp.  This will be where you save the markdown files.  You will want to download this. */
        await createDir(fs.root, [which_now])
            .then(createFiles(fs.root, which, which_now, parsedCSV))
            .catch(err => {
                console.log("Error 2")
                errorHandler(err)
            })
    })

    /**
        // For persistent storage.  @see https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem#using_persistent_storage
        window.webkitStorageInfo.requestQuota(PERSISTENT, 2*1024*1024, function(grantedBytes) 
            {
                window.requestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
            }, 
            function(e) {
              console.log('Error 2', e);
            }
        )
    */
}

/*
 * Create a new folder at the filesystem root.
 */
async function createDir(rootDirEntry, folder) {
    return new Promise(resolve => {
        rootDirEntry.getDirectory(folder, { create: true }, function(dirEntry) {
            console.log("Creating folder " + folder + "...")
        }, errorHandler)
    })
}

/**
 * A helper to go over every row from the CSV and serialize it into the markdown file we want.
 * It will save the file to the browser filesystem.  A link will be produced for each file to download it.
 * If possible, it would be great if we could just create a zip folder or something.  
 */
function createFiles(rootDirEntry, which, which_now, parsedCSV) {
    /*Go over each "row" and generate the appropriate .md file for it.  Save that md file with strategic name.*/
    console.log("Generate a file for each row")
    let l, links, mdHeader, mdBody, utl_id
    document.getElementById("available" + which).innerHTML = ""
    parsedCSV.data.forEach(row => {
        if (which === "transcriptions") {
            l = row["Manuscript Link"] ? row["Manuscript Link"].trim() : "No Link Provided"
            utl_id = l.substr(l.lastIndexOf("paleography:"), l.length - 1).replace("paleography:", "")
            //utl_id = l.substr(0, l.lastIndexOf("_")).replace("ip_","").replace("fp_","");
            links = `<table border="0.5" cellpadding="1" cellspacing="1" style="width: 200px; background-color:#F8F8F8;">
    <tbody style="border-color:#ccc">
        <tr style="border-color:#ccc">
            <td>Go to <a href="https://centerfordigitalhumanities.github.io/Newberry-French-paleography/_background_essay/${utl_id}" target="_blank">Background Essay</a></td>
            <td>Go to <a href="https://centerfordigitalhumanities.github.io/Newberry-French-paleography/www/record.html?id=${utl_id}" target="_blank">Manuscript</a> page</td>
        </tr>
    </tbody>
</table>`

            mdHeader = `---  
layout: default  
title: ${row["Title"]}  
utl_id: ${utl_id}
---`

            mdBody = `

### Title

${row["Manuscript Title"]}

### Description

${row["Description"]}

### Partial Transcription

${row["Partial Transcription"]}

### Related Links

${links}`

        } 
        else if (which === "essays") {
            l = row["Manuscript Link"] ? row["Manuscript Link"].trim() : "No Link Provided"
            utl_id = l.substr(l.lastIndexOf("paleography:"), l.length - 1).replace("paleography:", "")
            //utl_id = l.substr(0, l.lastIndexOf("_")).replace("ip_","").replace("fp_","");
            links = `<table border="0.5" cellpadding="1" cellspacing="1" style="width: 200px; background-color:#F8F8F8;">
    <tbody style="border-color:#ccc">
        <tr style="border-color:#ccc">
            <td>Go to <a href="https://centerfordigitalhumanities.github.io/Newberry-French-paleography/_transcriptions/${utl_id}" target="_blank">Partial Transcription</a></td>
            <td>Go to <a href="https://centerfordigitalhumanities.github.io/Newberry-French-paleography/www/record.html?id=${utl_id}" target="_blank">Manuscript</a> page</td>
        </tr>
    </tbody>
</table>`

            mdHeader = `---  
layout: default  
title: ${row["Title"]}  
utl_id: ${utl_id}
---`
            
            mdBody = `

### Title

${row["Manuscript Title"]}

### Description

${row["Description"]}

### Background Essays

${row["Background"]}

### Bibliography

${row["Bibliography"]}

### Related Links

${links}`
        }
        let fileText = mdHeader + mdBody
        /* Create markdown file*/
        createFile(rootDirEntry, which_now, utl_id + ".md", fileText, which)
    }, errorHandler)
    //Show the Download All button
    //document.getElementById("downloadall"+which).style.display = "block"
}

/**
 *  Create a file in the browser filesystem at the provided directory 
 */
async function createFile(rootDirEntry, directory, filename, filecontent, which) {
    return new Promise(resolve => {
        rootDirEntry.getFile("/" + directory + "/" + filename, { create: true, exclusive: true }, function(fileEntry) {
            fileEntry.createWriter(function(fileWriter) {
                fileWriter.onwriteend = function(e) {
                    console.log('File Write completed: ' + filename)
                    let downloadLink = "filesystem:https://centerfordigitalhumanities.github.io/temporary/" + directory + "/" + filename
                    let downloadMe = `<li><a href="${downloadLink}" download>Download ${filename}</li></a>`
                    document.getElementById("available" + which).innerHTML += downloadMe
                }
                fileWriter.onerror = function(e) {
                    console.warn('File Write failed: ' + filename)
                    console.error(e)
                }
                // Create a new Blob and write it to md file
                let blob = new Blob([filecontent], { type: 'text/markdown' })
                fileWriter.write(blob)
            }, errorHandler)
        }, errorHandler)
    })
}

/**
 * Use PapaParse to convert CSV file into a more serializable format (JSON) 
 * papaparse.min.js is also included on HTML pages that use this script.
 * It can be accessed through the global variable Papa
 */
async function getFromCSVInfo(fileText) {
    return Papa.parse(fileText, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            return results
        }
    })

    /*
    return new Promise(resolve => {
        Papa.parse(fileText, {
            header: true,
            dynamicTyping: true,
            complete: function(results) {
                resolve(results.data)
            }
        })
    })
    */
}

/**
 * Use File API to rename a directory
 */
async function renameDir(rootDirEntry, src, newName) {
    return new Promise(resolve => {
        rootDirEntry.getDirectory(src, {}, function(dirEntry) {
            console.log("Renaming " + src + " to " + newName + "...")
            dirEntry.moveTo(rootDirEntry, newName)
        }, errorHandler)
    })
}

/**
 * Use File API to recusrively remove a directory and its children
 */
async function removeDir(rootDirEntry, folder) {
    return new Promise(resolve => {
        rootDirEntry.getDirectory(folder, {}, function(dirEntry) {
            dirEntry.removeRecursively(function() {
                console.log("Directory " + folder + " removed.")
            }, errorHandler)
        }, errorHandler)
    })
}

function errorHandler(e) {
    let msg = e
    console.warn('Error 1: ')
    console.error(msg)
}

/**
 * Here is how to read from the browser filestytem programmatically if you need to. 
 */
function readOutFileSystem(rootDirEntry) {
    let dirReader = rootDirEntry.createReader();
    let entries = [];
    console.log("Reading out file system")
    let readEntries = function() {
        dirReader.readEntries(function(results) {
            if (!results.length) {
                console.log(entries.sort())
            } else {
                entries = entries.concat(Array.from(results))
                readEntries()
            }
        }, errorHandler)
    }
    readEntries() // Start reading dirs.
}

/**
 * Loop download buttons and download all.
 * 
 * This does not work.  The Browser does not let this happen.
 */ 
function downloadAll(event, which) {
    let r = confirm("This will download all the "+which+" to your Downloads folder")
    if(r){
        document.getElementById("available" + which).querySelectorAll("a").forEach(downloadLink => {
            setTimeout(function(){ 
                downloadLink.click() 
            }, 250)
        })
    }
}