// 颜文字背景生成
const kaomojiList = ["😎", "🤠", "🥸", "🤩", "🧐", "🥰", "😏", "😶‍🌫️", "🫠", "🥳"];

function createKaomojiBackground() {
    const container = document.createElement('div');
    container.className = 'kaomoji-container';
    
    // 根据屏幕尺寸调整数量
    const count = window.innerWidth < 768 ? 8 : 12;
    
    for (let i = 0; i < count; i++) {
        const kaomoji = document.createElement('div');
        kaomoji.className = 'kaomoji-bg';
        kaomoji.textContent = kaomojiList[Math.floor(Math.random() * kaomojiList.length)];
        
        // 动态参数
        const size = 2 + Math.random() * 4;
        const delay = Math.random() * 20;
        const duration = 15 + Math.random() * 15;
        
        Object.assign(kaomoji.style, {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${size}vw`,
            opacity: 0.05 + Math.random() * 0.1,
            animation: `float ${duration}s linear ${delay}s infinite`,
            transform: `rotate(${-15 + Math.random() * 30}deg)`
        });
        
        container.appendChild(kaomoji);
    }
    document.body.appendChild(container);
}

// 移动端菜单逻辑
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    // 触摸事件处理
    const toggleMenu = (e) => {
        e.preventDefault();
        menuOpen = !menuOpen;
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    };

    // 混合事件处理
    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileMenuBtn.addEventListener('touchstart', toggleMenu);

    // 关闭菜单检测
    document.addEventListener('click', (e) => {
        if (menuOpen && !e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            menuOpen = false;
        }
    });

    // 防止滚动穿透
    navLinks.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
}

// 项目卡片交互优化
function initProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
        let isTouch = false;
        
        // 鼠标/触摸悬浮效果
        const handleEnter = () => card.classList.add('hover');
        const handleLeave = () => card.classList.remove('hover');
        
        // 桌面端事件
        card.addEventListener('mouseenter', handleEnter);
        card.addEventListener('mouseleave', handleLeave);
        
        // 移动端事件
        card.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isTouch = true;
            handleEnter();
            setTimeout(() => isTouch = false, 500);
        });
        
        card.addEventListener('touchend', (e) => {
            if (isTouch) {
                handleLeave();
                const link = card.dataset.link;
                if (link) window.open(link, '_blank');
            }
        });
        
        // 点击事件兼容
        card.addEventListener('click', () => {
            if (!('ontouchstart' in window)) {
                const link = card.dataset.link;
                if (link) window.open(link, '_blank');
            }
        });
    });
}

// 微信弹窗功能
function initWechatPopup() {
    const wechatBtn = document.querySelector('.wechat');
    const qrPopup = document.createElement('div');
    qrPopup.className = 'qr-popup';
    qrPopup.innerHTML = `
        <div class="qr-content">
            <img src="./img/wechat.jpg" alt="微信二维码">
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
}

// 平滑滚动和导航激活
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 更新导航状态
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// 社交图标交互
function initSocialIcons() {
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
}

// 文章列表功能
const articles = [
    {
        title: "《你当像鸟飞往你的山》图书分享稿",
        date: "2025-04-27",
        excerpt: "在又一次阅读了《你当像鸟飞往你的山》我决定在校园图书分享会上分享这本书",
        link: "https://blog.maresera.top/posts/educated-read"
    },
];

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

// 初始化函数
function init() {
    createKaomojiBackground();
    initMobileMenu();
    initProjectCards();
    initWechatPopup();
    initSmoothScroll();
    initSocialIcons();
    renderArticles();
    
    // 页面加载动画
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}

// 启动初始化
document.addEventListener('DOMContentLoaded', init);

// 移动端滚动优化
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const navLinks = document.querySelector('.nav-links');
    
    if (Math.abs(currentScroll - lastScroll) > 50) {
        navLinks.classList.remove('active');
    }
    lastScroll = currentScroll;
}, { passive: true });

// 触摸反馈优化
document.querySelectorAll('a, button').forEach(el => {
    el.style.webkitTapHighlightColor = 'rgba(0, 255, 136, 0.3)';
});
