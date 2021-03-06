$(document).ready(function () {
    //themes, change CSS with JS
    //default theme(CSS) is spacelab, change it if needed
    var current_theme = $.cookie('current_theme') == null ? 'cerulean' : $.cookie('current_theme');

    switch_theme(current_theme);

    $('#themes a[data-value="' + current_theme + '"]').find('i').addClass('icon-ok');

    //樣式選擇
    $('#themes a').click(function (e) {
        e.preventDefault();
        current_theme = $(this).attr('data-value');
        $.cookie('current_theme', current_theme, { expires: 365, path: '/' });
        switch_theme(current_theme);
        $('#themes i').removeClass('icon-ok');
        $(this).find('i').addClass('icon-ok');
    });

    var page_size = $.cookie('page_size') == null ? '30' : $.cookie('page_size');

    $('#pages a[data-value="' + page_size + '"]').find('i').addClass('icon-ok');

    //分頁選擇
    $('#pages a').click(function (e) {
        e.preventDefault();
        page_size = $(this).attr('data-value');
        $.ajax({
            url: "../Account/ChangePageSize?ra=" + RandomNumber() + "&ps=" + page_size,
            success: function (msg) {
                $.cookie('page_size', page_size, { expires: 365, path: '/' });
                window.location.href = $('#navigate>li>a').attr('href');
                $('#pages i').removeClass('icon-ok');
                $(this).find('i').addClass('icon-ok');
            }
        });
    });

    function switch_theme(theme_name) {
        $('#bs-css').attr('href', '/lib/css/bootstrap-' + theme_name + '.css');
    }

    //ajax menu checkbox
    $('#is-ajax').click(function (e) {
        $.cookie('is-ajax', $(this).prop('checked'), { expires: 365 });
    });
    $('#is-ajax').prop('checked', $.cookie('is-ajax') === 'true' ? true : false);

    //disbaling some functions for Internet Explorer
    if ($.browser.msie) {
        $('#is-ajax').prop('checked', false);
        $('#for-is-ajax').hide();
        $('#toggle-fullscreen').hide();
        $('.login-box').find('.input-large').removeClass('span10');

    }

    //隐藏ajax menu
    $('#for-is-ajax').hide();
    $('#is-ajax').prop('checked', false);

    //establish history variables
    var 
		History = window.History, // Note: We are using a capital H instead of a lower h
		State = History.getState(),
		$log = $('#log');

    //bind to State Change
    History.Adapter.bind(window, 'statechange', function () { // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
        $.ajax({
            url: State.url,
            success: function (msg) {
                $('#content').html($(msg).find('#content').html());
                $('#loading').remove();
                $('#content').fadeIn();
                var newTitle = $(msg).filter('title').text();
                $('title').text(newTitle);
                docReady();
                pageReady();
            }
        });
    });

    //highlight current / active link
    $('ul.main-menu li a').each(function () {
        if ($($(this))[0].href == String(window.location).split('&')[0]) {
            $(this).parent().addClass('active');
        }
    });

    //ajaxify menus[用戶選單 click的效果]
    $('a.ajax-link').click(function (e) {
        $.cookie('parent_Key', 0, { expires: 365, path: '/' });
        if ($.browser.msie) e.which = 1;
        if (e.which != 1 || !$('#is-ajax').prop('checked') || $(this).parent().hasClass('active')) return;
        e.preventDefault();
        if ($('.btn-navbar').is(':visible')) {
            $('.btn-navbar').click();
        }
        $('#loading').remove();
        $('#content').fadeOut().parent().append('<div id="loading" class="center">Loading...<div class="center"></div></div>');
        var $clink = $(this);
        History.pushState(null, null, $clink.attr('href'));
        $('ul.main-menu li.active').removeClass('active');
        $clink.parent('li').addClass('active');
    });

    //animating menus on hover[用戶選單 hover的效果]
    $('ul.main-menu li:not(.nav-header)').hover(function () {
        $(this).animate({ 'margin-left': '+=5' }, 200);
    },
	function () {
	    $(this).animate({ 'margin-left': '-=5' }, 200);
	});

    //other things to do on document ready, seperated for ajax calls
    docReady();
});


function docReady() {
    //prevent # links from moving to top
    $('a[href="#"][data-top!=true]').click(function (e) {
        e.preventDefault();
    });

    //datepicker
    //$('.datepicker').datepicker();

    //notifications 弹出层提示
    $('.noty').click(function (e) {
        e.preventDefault();
        var options = $.parseJSON($(this).attr('data-noty-options'));
        noty(options);
    });

    //popover
    $('[rel="popover"],[data-rel="popover"]').popover();

    //uniform - styler for checkbox, radio and file input 多选框 单选框 文件按钮扩展
    $("input:checkbox, input:radio, input:file").not('[data-no-uniform="true"],#uniform-is-ajax').uniform();

    //chosen - improves select 下拉框扩展
    $('[data-rel="chosen"],[rel="chosen"]').chosen();

    //tabs 选项卡扩展
    $('#myTab a:first').tab('show');
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    //makes elements soratble, elements that sort need to have id attribute to save the result 拖拉层扩展
    $('.sortable').sortable({
        revert: true,
        cancel: '.btn,.box-content,.nav-header',
        update: function (event, ui) {
            //line below gives the ids of elements, you can make ajax call here to save it to the database
            //console.log($(this).sortable('toArray'));
        }
    });

    //slider 滑板
    $('.slider').slider({ range: false, values: [0, 24] });

    //tooltip 提示框
    $('[rel="tooltip"],[data-rel="tooltip"]').tooltip({ "placement": "bottom", delay: { show: 400, hide: 200} });

    //iOS / iPhone style toggle switch iphone切换卡
    $('.iphone-toggle').iphoneStyle();

    ////gallery controlls container animation
    //$('ul.gallery li').hover(function () {
    //    $('img', this).fadeToggle(1000);
    //    $(this).find('.gallery-controls').remove();
    //    $(this).append('<div class="well gallery-controls">' +
    //						'<p><a href="#" class="gallery-edit btn"><i class="icon-edit"></i></a> <a href="#" class="gallery-delete btn"><i class="icon-remove"></i></a></p>' +
    //					'</div>');
    //    $(this).find('.gallery-controls').stop().animate({ 'margin-top': '-1' }, 400, 'easeInQuint');
    //}, function () {
    //    $('img', this).fadeToggle(1000);
    //    $(this).find('.gallery-controls').stop().animate({ 'margin-top': '-30' }, 200, 'easeInQuint', function () {
    //        $(this).remove();
    //    });
    //});

    $('.btn-close').click(function (e) {
        e.preventDefault();
        $(this).parent().parent().parent().fadeOut();
    });
    $('.btn-minimize').click(function (e) {
        e.preventDefault();
        var $target = $(this).parent().parent().next('.box-content');
        if ($target.is(':visible')) $('i', $(this)).removeClass('icon-chevron-up').addClass('icon-chevron-down');
        else $('i', $(this)).removeClass('icon-chevron-down').addClass('icon-chevron-up');
        $target.slideToggle();
    });
    $('.btn-setting').click(function (e) {
        e.preventDefault();
        $('#myModal').modal('show');
    });
    $('.btn-refresh').click(function (e) {
        e.preventDefault();
        //刷新
        $("#pQuery>input:text").val('');
        $("#pQuery").find("select").each(function () {
            $(this).find("option:first").prop('selected', 'selected');
        });

        var $target = $(this).parent().parent().next('.box-content');
        $target.html('<div id="loading" class="center">Loading...<div class="center"></div></div>');
        pageRefresh($target);
    });

    var menu_id = $.cookie('menu_id') == null ? '' : $.cookie('menu_id');
    ShowSubMenu(menu_id);

    //保持在线
    var keeponline = setInterval("GetOnline()", 20000);

    //当前时间
    getDateAuto('localtime');

    //Top
    $.scrollUp({
        animation: 'slide',
        activeOverlay: '#00FFFF'
    });
}

var GetOnline = function () {
    var dateNow = $.cookie('date_now') == null ? '' : $.cookie('date_now');
    //$("#heartbeat").attr("src", "../Account/KeepOnline?dateNow=" + dateNow);
}

var ShowSubMenu = function (obj) {
    if (obj != '') {
        var menuid = obj.replace("main", "");
        var submenu = $("li[name='sub" + menuid + "']");
        $("li[name^='sub_']").hide();
        submenu.show('slow');
        var topmid = submenu.attr("MID");
        $("#Top_" + topmid).addClass('current');
        $.cookie('menu_id', obj, { expires: 365, path: '/' });
    }
}

var showdialog = function (msg) {
    $('#btnSave').removeAttr("disabled");
    $('#btnSave').show();
    $('#loading').remove();
    $(".modal-body").html(msg);
}

//弹框查看详情 不需要保存按钮
var showDetail = function (msg) {
    $('#btnSave').attr("disabled");
    $('#btnSave').hide();
    $('#loading').remove();
    $(".modal-body").html(msg);
}

var disabledbtn = function () {
    $('#btnSave').attr("disabled", "disabled");
    $('#btnDel').attr("disabled", "disabled");
    $('#btnAllSave').attr("disabled", "disabled");
}

var error = function (msg) {
    $('#btnAllSave').attr("disabled", "disabled");
    $('#btnAllSave').hide();
    $('#btnSave').attr("disabled", "disabled");
    $('#btnSave').hide();
    $('#btnDel').attr("disabled", "disabled");
    $('#btnDel').hide();
    $('#loading').remove();
    $(".modal-body").html('<div class="alert alert-error"><strong>Load Error!</strong> Change a few things up and try submitting again.</div>');
};
var savesuccess = function (msg) {
    $('#btnAllSave').attr("disabled", "disabled");
    $('#btnAllSave').hide();
    $('#btnSave').attr("disabled", "disabled");
    $('#btnSave').hide();
    $('#btnDel').attr("disabled", "disabled");
    $('#btnDel').hide();
    if (msg.IsSuccess) {
        $('#loading').remove();
        $(".modal-body").html('<div class="alert alert-success"><strong>' + msg.Message + '</strong></div>');
        $('.btn-refresh').click();
    } else { saveerror(); }
};
var saveerror = function (e) {
    $('#btnAllSave').attr("disabled", "disabled");
    $('#btnAllSave').hide();
    $('#btnSave').attr("disabled", "disabled");
    $('#btnSave').hide();
    $('#btnDel').attr("disabled", "disabled");
    $('#btnDel').hide();
    $('#loading').remove();
    if (typeof (e) == 'undefined') { $(".modal-body").html('<div class="alert alert-error"><strong>Save Error!</strong> Change a few things up and try submitting again.</div>'); return; }
    if (e.responseText != 'The Current Account Does Not Have The Authority To Operate') {
        $(".modal-body").html('<div class="alert alert-error"><strong>Save Error!</strong> Change a few things up and try submitting again.</div>');
    } else {
        $(".modal-body").html("<div class='alert alert-error'><strong>Save Error!</strong> " + e.responseText + ".</div>");
    }
};