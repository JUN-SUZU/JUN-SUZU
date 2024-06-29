fetch('https://qiita.com/api/v2/users/JUN-SUZU', {
    headers: {
        'Authorization': 'Bearer e844be255485ddfd78b6c44227494248e67d97a2'
    },
}
).then(response => {
    return response.json();
}).then(data => {
    document.getElementById('qiitaDescription').innerHTML = data.description;
    document.getElementById('qiitaFollowers').innerHTML = data.followers_count;
    document.getElementById('qiitaFollowees').innerHTML = data.followees_count;
    document.getElementById('qiitaItems').innerHTML = data.items_count;
}).catch(error => {
    console.error('Error:', error);
});

fetch('https://qiita.com/api/v2/users/JUN-SUZU/items', {
    headers: {
        'Authorization': 'Bearer e844be255485ddfd78b6c44227494248e67d97a2'
    }
})
    .then(response => response.json())
    .then(data => {
        let html = '';
        if (data.length > 5) {
            data = data.slice(0, 5);
        }
        data.forEach(data => {
            html += `<div class="panel__qiita__container"><h3><a href="${data.url}" target="_blank">${data.title}</a></h3>`
            data.tags.forEach(tag => {
                html += `<a href="https://qiita.com/tags/${tag.name}" target="_blank" class="qiita_tag">${tag.name}</a>`;
            });
            html += `<p class="qiita_date">${data.created_at.slice(0, 10)}</p>`;
            html += `</div>`;
        });

        // 完成したHTML文字列を要素に挿入
        document.getElementById('qiita__post__container').innerHTML = html;
    })
