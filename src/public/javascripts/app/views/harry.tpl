<section id="hermione">
	<h2><%= i18n.headline %></h2>

    <ul>
        <li><%= i18n.labels.user %>: <%= user.name %> (@<%= user.nick %>, <%= i18n.labels.followers %>: <%= user.followers %>, <%= i18n.labels.statuscount %>: <%= user.statuscount %>)</li>
        <li><%= i18n.labels.format %>:

            <% if (landscape) { %>
                <%= i18n.formats.landscape %>
            <% } else { %>
                <%= i18n.formats.portrait %>
            <% } %>
        </li>
        <li><%= i18n.labels.tweet %>: <%= tweet.text %></li>
    </ul>
</section>