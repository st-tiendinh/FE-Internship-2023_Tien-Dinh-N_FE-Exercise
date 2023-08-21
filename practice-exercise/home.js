import { fetchPostData } from './apiCall.js';
import handleScrollHeader from './header.js';

const renderProductList = async () => {
  const data = await fetchPostData();
  const postSection = document.querySelector('.section.section-post');
  postSection.innerHTML = `
    <ul class="post-list">
      ${data
        .map((post) => {
          const { id, author, authorAvatar, timestamp, title, content, imageUrl, like, comment } = post;
          return `
          <li class="post-item">
            <div class="post">
              <a href="detail.html" class="post-link">
                <div class="post-header">
                  <div class="post-info">
                    <div class="post-author">
                      <img src="${authorAvatar}" alt="" class="post-author-avatar" />
                      <p class="post-author-name">${author}</p>
                    </div>
                    <span class="post-timestamp">${timestamp}</span>
                  </div>
                  <div class="post-header-action">
                    <a href="" class="post-header-action-show-more">...</a>
                  </div>
                </div>
                <div class="post-body">
                  <div class="post-summary">
                    <h4 class="post-title">${title}</h4>
                    <p class="post-desc text-truncate">
                      ${content}
                    </p>
                    <div class="post-interaction">
                      <div class="post-action">
                        <span class="post-like"><i class="ic ic-like"></i>${like}</span>
                        <span class="post-comment"><i class="ic ic-message"></i>${comment}</span>
                      </div>
                      <ul class="post-badge-list">
                        <li class="post-badge-item"><a href="" class="badge badge-primary">React</a></li>
                        <li class="post-badge-item"><a href="" class="badge badge-primary">React</a></li>
                        <li class="post-badge-item"><a href="" class="badge badge-primary">React</a></li>
                      </ul>
                    </div>
                  </div>
                  <img src="${imageUrl}" alt="post image" class="post-image" />
                </div>
              </a>
            </div>
          </li>`;
        })
        .join('')}
    </ul>`;
};

renderProductList();
handleScrollHeader();
