package discordapp

import (
	"log"

	"github.com/bwmarrin/discordgo"
)

// NewSession creates a Discord session with required intents and a default
// message handler that logs received messages. The caller is responsible for
// opening and closing the session.
func NewSession(token string) (*discordgo.Session, error) {
	session, err := discordgo.New("Bot " + token)
	if err != nil {
		return nil, err
	}

	// Enable intents to receive message events and their content
	session.Identify.Intents = discordgo.IntentGuildMessages | discordgo.IntentMessageContent

	// Register a handler for message create events
	session.AddHandler(onMessageCreateLog)

	return session, nil
}

func onMessageCreateLog(s *discordgo.Session, m *discordgo.MessageCreate) {
	// Ignore messages from bots (including itself)
	if m.Author == nil || m.Author.Bot {
		return
	}
	log.Printf("received message in channel %s from %s: %s", m.ChannelID, m.Author.Username, m.Content)
}
