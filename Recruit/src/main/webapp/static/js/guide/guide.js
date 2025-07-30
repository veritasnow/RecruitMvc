$(function(){
    $('#footer').load('./guide_footer.html')

    $('#aside').load('./guide_aside.html', function(){
        var pathname = window.location.pathname.split('/')
            lastindex = pathname.length;
            lastpath = pathname[lastindex-1]
            pathname = lastpath.split('.')
            $navmenu = $("li."+ pathname[0])
        
        $('.nav-snb li').removeClass('on')
        $navmenu.addClass('on')
    })

    
});