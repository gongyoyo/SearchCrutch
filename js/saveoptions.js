/* global searchselect_array search_custom_num isEmpty */
$("cb_0").addEventListener("click",save_options);        //谷歌
$("cb_1").addEventListener("click",save_options);        //谷歌复原
$("cb_2").addEventListener("click",save_options);        //百度
$("cb_3").addEventListener("click",save_options);        //必应
$("cb_4").addEventListener("click",save_options);        //雅虎
$("cb_5").addEventListener("click",save_options);        //搜狗
$("cb_6").addEventListener("click",save_options);        //360
$("cb_7").addEventListener("click",save_options);        //自定义
$("cb_8").addEventListener("click",save_options);        //自定义
$("cb_9").addEventListener("click",save_options);        //自定义
$("cb_10").addEventListener("click",save_options);       //自定义
$("cb_11").addEventListener("click",save_options);       //自定义
$("cb_12").addEventListener("click",save_options);       //自定义

$("custom_name_0").addEventListener("input",save_options);          //自定义名称
$("custom_search_0").addEventListener("input",save_options);        //自定义搜索
$("custom_name_1").addEventListener("input",save_options);          //自定义名称
$("custom_search_1").addEventListener("input",save_options);        //自定义搜索
$("custom_name_2").addEventListener("input",save_options);          //自定义名称
$("custom_search_2").addEventListener("input",save_options);        //自定义搜索
$("custom_name_3").addEventListener("input",save_options);          //自定义名称
$("custom_search_3").addEventListener("input",save_options);        //自定义搜索
$("custom_name_4").addEventListener("input",save_options);          //自定义名称
$("custom_search_4").addEventListener("input",save_options);        //自定义搜索
$("custom_name_5").addEventListener("input",save_options);          //自定义名称
$("custom_search_5").addEventListener("input",save_options);        //自定义搜索

$("cb_switch").addEventListener("click",save_options);    //单击图标切换
$("cb1_explain").addEventListener("click",explain);

$("cb_autosync").addEventListener("click",save_options);      //自动同步云端数据
$("cb_upload").addEventListener("click",upload_options);      //上传云端同步数据
$("cb_download").addEventListener("click",download_options);  //下载云端同步数据

// Saves options to localStorage.
function save_options() {
    var i;
    for( i=0; i<searchselect_array.length+search_custom_num; i++ ) {
        var cb_id = "cb_" + i;
        localStorage[ cb_id ] = $(cb_id).checked?"checked":"no";
    }
    for( i=0; i<search_custom_num; i++ ) {
        var custom_name_id = "custom_name_" + i;
        var custom_search_id = "custom_search_" + i;
        localStorage[ custom_name_id ]   = $(custom_name_id).value;
        localStorage[ custom_search_id ] = $(custom_search_id).value;
    }
    localStorage[ "cb_switch" ] = $("cb_switch").checked?"checked":"no";
    localStorage[ "cb_autosync" ] = $("cb_autosync").checked?"checked":"no";
    
    var statusDiv=document.createElement("div");
    statusDiv.textContent = "选项已保存";
    statusDiv.style.zIndex = 9999;
    statusDiv.style.width = "300px";
    statusDiv.style.height = "40px";
    statusDiv.style.background = "#74b775";
    statusDiv.style.position = "absolute";
    statusDiv.style.textAlign = "center";
    statusDiv.style.fontSize = "26px";
    statusDiv.style.top = (parseInt(document.body.scrollTop) + 0) + "px";
    statusDiv.style.left = (parseInt(document.body.scrollWidth) - 300)/2 + "px";
    document.body.appendChild(statusDiv);
    setTimeout(function() {document.body.removeChild(statusDiv);}, 1000);
}

function explain() {
    if( $("div_exp").style.display == "none" ) {
        $("lb_imgg").className = "heighup";
        $("div_exp").style.display = "";
    } else {
        $("lb_imgg").className = "";
        $("div_exp").style.display = "none";
    }
}

function upload_options() {
    var i;
    var data = new Object();
    for( i=0; i<searchselect_array.length+search_custom_num; i++ ) {
        var cb_id = "cb_" + i;
        data[cb_id] = localStorage[ cb_id ];
    }
    for( i=0; i<search_custom_num; i++ ) {
        var custom_name_id = "custom_name_" + i;
        var custom_search_id = "custom_search_" + i;
        data[custom_name_id] = localStorage[ custom_name_id ];
        data[custom_search_id] = localStorage[ custom_search_id ];
    }
    data["cb_switch"] = localStorage[ "cb_switch" ];
    data["cb_autosync"] = localStorage[ "cb_autosync" ];
    data["backup_data"] = true;
    
    browser.storage.sync.clear(function(){
        browser.storage.sync.set(data, function(){
            alert("数据备份成功！");
        });
    });
    
}

function download_options() {
    browser.storage.sync.get("backup_data", function (item) { 
        if(isEmpty(item)) {
            alert("您尚未备份过数据，请先点击“备份数据”按钮进行备份！");
        } else {
            var i;
            for( i=0; i<searchselect_array.length+search_custom_num; i++ ) {
                var cb_id = "cb_" + i;
                browser.storage.sync.get(cb_id, function (item) { 
                    for (var key in item) break;    //取第一个
                    localStorage[key] = item[key];
                });
            }
            for( i=0; i<search_custom_num; i++ ) {
                var custom_name_id = "custom_name_" + i;
                var custom_search_id = "custom_search_" + i;
                browser.storage.sync.get(custom_name_id, function (item) { 
                    for (var key in item) break;
                    localStorage[key] = item[key];
                });
                browser.storage.sync.get(custom_search_id, function (item) { 
                    for (var key in item) break;
                    localStorage[key] = item[key];
                });
            }
            browser.storage.sync.get("cb_switch", function (item) { 
                localStorage["cb_switch"] = item.cb_switch;
            });
            browser.storage.sync.get("cb_autosync", function (item) { 
                localStorage["cb_autosync"] = item.cb_autosync;
            });
            alert("数据恢复成功！");
            window.location.reload();
        }
    });
}
