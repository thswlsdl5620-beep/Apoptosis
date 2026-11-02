const $ = (id) => document.getElementById(id);

function getOptVal(q, opt) { 
    return (q['보기' + opt] || q['보기' + opt.toLowerCase()] || '').trim(); 
}

function getCorrect(q) { 
    return (q['정답'] || '').trim().toUpperCase(); 
}

function formatGoogleSheetUrl(rawUrl) {
    if (!rawUrl) return '';
    let url = rawUrl.trim();
    
    // 이미 pub?output=csv 형태인 경우
    if (url.includes('/pub') && url.includes('output=csv')) {
        return url;
    }
    // pubhtml 인 경우 -> pub?output=csv
    if (url.includes('/pubhtml')) {
        return url.replace('/pubhtml', '/pub?output=csv');
    }
    if (url.includes('/pub') && !url.includes('output=csv')) {
        return url.includes('?') ? `${url}&output=csv` : `${url}?output=csv`;
    }
    
    // 일반 구글 스프레드시트 공유 링크: /spreadsheets/d/{id}/edit...
    const sheetIdMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (sheetIdMatch && sheetIdMatch[1]) {
        const sheetId = sheetIdMatch[1];
        const gidMatch = url.match(/[?&#]gid=([0-9]+)/);
        const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';
        return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv${gidParam}`;
    }
    
    return url;
}
