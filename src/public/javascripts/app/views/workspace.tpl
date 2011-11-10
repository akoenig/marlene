<div class="topbar">
    <div class="topbar-inner">
        <div class="container-fluid">
            <a class="brand" href="/app"><%= i18n.header.headline %></a>

            <ul class="nav">
                <li class="create"><a href="#create"><%= i18n.header.toolbar.create %></a></li>
                <li class="download"><a href="#download"><%= i18n.header.toolbar.download %></a></li>
            </ul>
            <p class="pull-right"><img class="avatar" src="<%= user.avatar %>" alt="<%= i18n.header.user.avataralt %>" /> <span data-bind="text name"><%= user.name %> </span> <a class="logout" href="/logout">(abmelden)</a></p>
        </div>
    </div>
</div>


<div id="poster-wrapper">
    <div id="poster"></div>
</div>