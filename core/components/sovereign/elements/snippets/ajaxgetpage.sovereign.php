<?php
if ($ajax=='1'){
    $loadPage       = $_REQUEST['page'];
    $current        = $_REQUEST['current'];
    $modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of current : ' . $current);

    $page=$modx->runSnippet('getPage',$scriptProperties);
    $pagination='<ul>'.$modx->getPlaceholder('page.nav').'</ul>';
/*
    $direction = 'left';
    if ($current < $loadPage) {
        $direction = 'right';
    }

    $paginatedStyle = 'style="left:'.($direction == 'left' ? '-750px' : '750px').';"';

*/
// The paginated content HTML slide
    $page = '<div class="paginated" id="" '.$paginatedStyle.'>'.$page.'</div>';
    return json_encode(array( 'pagination' => $pagination, 'page' => $page, 'current' => $loadPage ));

}


//$modx->regClientCss($modx->getOption('assets_url').'components/sovereign/plugins/ajaxgetpage/pagination.css');
//$modx->regClientStartupScript($modx->getOption('assets_url').'components/sovereign/plugins/ajaxgetpage/jquery-1.4.2.min.js');
//$modx->regClientStartupScript($modx->getOption('assets_url').'components/sovereign/plugins/ajaxgetpage/pagination-jq.js');
$url=$modx->makeUrl($ajaxpage);
$furls = $modx->getOption('friendly_urls');
$qstring = !empty($furls) ? '?page=' : '&page=';
$js="
<script>
$(document).ready(function() {
new Paginator('{$url}',{qString : '{$qstring}'});
});
</script>
";
$modx->regClientStartupHTMLBlock($js);

return '';