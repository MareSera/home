// 颜文字库（可自行扩充）
const kaomojiList = [
    "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
    "♪(^∇^*)",
    "( ͡° ͜ʖ ͡°)",
    "٩(◕‿◕｡)۶",
    "(•ө•)♡",
    "ヾ(≧▽≦*)o",
    "ヽ(✿ﾟ▽ﾟ)ノ",
    "(´• ω •`)",
    "(◕‿◕✿)",
    "(*￣3￣)╭",
    "(⌒▽⌒)☆",
    "╰(*°▽°*)╯"
];

// 生成随机颜文字背景
// 修改后的颜文字生成逻辑
function createKaomojiBackground() {
    const count = 6 + Math.floor(Math.random() * 4); // 6-10个
    const container = document.createElement('div');
    
    for (let i = 0; i < count; i++) {
        const kaomoji = document.createElement('div');
        kaomoji.className = 'kaomoji-bg';
        kaomoji.textContent = kaomojiList[Math.floor(Math.random() * kaomojiList.length)];
        
        // 调整后的随机参数
        kaomoji.style.left = `${Math.random() * 100}%`;
        kaomoji.style.top = `${Math.random() * 100}%`;
        kaomoji.style.animationDelay = `${Math.random() * 30}s`;
        kaomoji.style.animationDuration = `${20 + Math.random() * 20}s`;
        kaomoji.style.fontSize = `${4 + Math.random() * 8}vw`; // 4-12vw
        kaomoji.style.opacity = `${0.03 + Math.random() * 0.12}`; // 0.03-0.15
        kaomoji.style.rotate = `${-10 + Math.random() * 20}deg`;
        
        container.appendChild(kaomoji);
    }
    
    document.body.appendChild(container);
}


// 初始化
document.addEventListener('DOMContentLoaded', createKaomojiBackground);



// 文章数据
const articles = [
    // {
    //     title: "前端工程化实践指南",
    //     date: "2024-03-20",
    //     excerpt: "从零搭建现代化前端工作流，整合Webpack+Vite双构建体系...",
    //     link: "#"
    // }
];

// 渲染文章列表
function renderArticles() {
    const container = document.getElementById('articlesContainer');
    container.innerHTML = '';
    
    if(articles.length === 0) {
        container.innerHTML = '<div class="no-articles">暂无近期更新</div>';
        return;
    }
    
    articles.slice(0, 3).forEach(article => {
        const articleEl = document.createElement('div');
        articleEl.className = 'article-item';
        articleEl.innerHTML = `
            <div class="article-header">
                <div class="article-title">${article.title}</div>
                <div class="article-date">${article.date}</div>
            </div>
            <div class="article-excerpt">${article.excerpt}</div>
        `;
        articleEl.dataset.link = article.link;
        container.appendChild(articleEl);
    });
}

// 文章点击事件
document.addEventListener('click', (e) => {
    const articleItem = e.target.closest('.article-item');
    if (articleItem) {
        window.open(articleItem.dataset.link, '_blank');
    }
});

// 初始化
renderArticles();



// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// 平滑滚动和页面切换
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // 更新导航激活状态
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// 社交图标悬浮动画
document.querySelectorAll('.icon-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(10deg)';
        this.style.boxShadow = '0 8px 20px rgba(0, 255, 136, 0.4)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// 微信二维码弹窗
const wechatBtn = document.querySelector('.wechat');
const qrPopup = document.createElement('div');
qrPopup.className = 'qr-popup';
qrPopup.innerHTML = `
    <div class="qr-content">
        <img src="https://via.placeholder.com/150" alt="微信二维码">
        <p>扫码添加微信</p>
    </div>
`;

wechatBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.appendChild(qrPopup);
    setTimeout(() => qrPopup.classList.add('show'), 10);
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.wechat')) {
        qrPopup.classList.remove('show');
        setTimeout(() => qrPopup.remove(), 300);
    }
});
// 项目卡片交互
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// 表单验证
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // 简单验证
    if (!formData.get('name') || !formData.get('email') || !formData.get('message')) {
        alert('请填写所有必填字段');
        return;
    }
    
    // 这里可以添加实际的提交逻辑
    alert('表单提交成功！');
    e.target.reset();
});


// 项目卡片点击跳转（新增代码）
document.querySelectorAll('.project-card').forEach(card => {
    // 在HTML中为每个卡片添加data-link属性
    card.addEventListener('click', function() {
        const link = this.dataset.link;
        if (link) {
            window.open(link, '_blank'); // 新标签页打开
            // 如果需要当前页跳转使用：window.location.href = link;
        }
    });
});

// 移动端菜单切换
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 点击外部关闭菜单
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
        navLinks.classList.remove('active');
    }
});

// 优化移动端滚动
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (Math.abs(currentScroll - lastScroll) > 50) {
        navLinks.classList.remove('active');
    }
    lastScroll = currentScroll;
});

// 优化触摸反馈
document.querySelectorAll('a, button').forEach(element => {
    element.style.webkitTapHighlightColor = 'rgba(0, 255, 136, 0.3)';
});

