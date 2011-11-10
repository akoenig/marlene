<section id="harry">
    <header>
        <h3><%= i18n.headline %></h3>
    </header>

    <ul>
        <li class="tweet"><%= tweet.text %></li>
        <li class="user"><%= i18n.labels.user %>: <%= user.name %> (@<%= user.nick %>, <%= i18n.labels.followers %>: <%= user.followers %>, <%= i18n.labels.statuscount %>: <%= user.statuscount %>)</li>
        <li><%= i18n.labels.format %>:

            <% if (landscape) { %>
                <%= i18n.formats.landscape %>
            <% } else { %>
                <%= i18n.formats.portrait %>
            <% } %>
        </li>
    </ul>
</section>