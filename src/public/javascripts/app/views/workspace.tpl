<div id="header">
    <h1><%= i18n.header.headline %></h1>

    <section id="toolbar">
        <nav>
            <ul>
                <li class="create"><a class="btn primary" href="#"><%= i18n.header.toolbar.create %></a></li>
                <li class="download"><a class="btn" href="#"><%= i18n.header.toolbar.download %></a></li>
                <li class="fullscreen"><a class="btn" href="#"><%= i18n.header.toolbar.fullscreen %></a></li>
            </ul>
        </nav>
    </section>

    <section id="user">
        <img class="avatar" src="<%= user.avatar %>" alt="<%= i18n.header.user.avataralt %>" /> <span data-bind="text name"><%= user.name %> </span> ▼

        <nav>
            <ul>
                <li><a class="btn small" href="/logout"><%= i18n.header.user.logout %></a></li>
            </ul>
        </nav>
    </section>
</div>