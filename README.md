# Honeycomb Inbox Interface

An interactive, visually stunning inbox interface built with React, D3.js, and GSAP animations. Features a unique honeycomb navigation system that transforms data extraction into an engaging visual experience.

![Demo](./demo.gif)

## ✨ Features

- **Interactive Honeycomb Navigation**: Dynamic D3.js-powered honeycomb cells with hover effects and drag functionality
- **Smooth Animations**: GSAP-powered transitions between states
- **Multi-Category Support**: Messages, Contacts, Team, Groups, Favorites, and Connections
- **Responsive Design**: Adapts to different screen sizes with glassmorphism effects
- **Real-time Data Fetching**: Integrates with multiple APIs to display various data types
- **Animated Transitions**: Honeycomb cells animate into the inbox when clicked

## 🚀 Technologies

- **Next.js** (App Router) with TypeScript
- **D3.js** for force-directed graphs
- **GSAP** for advanced animations
- **SCSS Modules** for styling
- **JSONPlaceholder, DummyJSON, ReqRes** for demo data

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/honeycomb-inbox.git
cd honeycomb-inbox
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Add required assets:
   - Place `hero.gif` in the `/public` directory
   - Add icon images in `/public/icons/`:
     - `employees.png`
     - `inbox.png`
     - `contacts.png`
     - `team.png`
     - `workflows.png`
     - `campaign.png`

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory to customize API endpoints:

```env
NEXT_PUBLIC_MESSAGES_API=https://jsonplaceholder.typicode.com/comments
NEXT_PUBLIC_USERS_API=https://dummyjson.com/users
NEXT_PUBLIC_GROUPS_API=https://jsonplaceholder.typicode.com/albums
NEXT_PUBLIC_POSTS_API=https://jsonplaceholder.typicode.com/posts
NEXT_PUBLIC_CONNECTIONS_API=https://reqres.in/api/users?page=1
```

## 📁 Project Structure

```
├── app/
│   └── page.tsx                    # Main page component
├── components/
│   ├── honeycombbutton.tsx         # Honeycomb button containers
│   ├── Honeycomb.tsx               # D3.js honeycomb cells
│   ├── Inbox.tsx                   # Main inbox component
│   ├── InboxNavbar.tsx             # Navigation bar
│   ├── InboxSidebar.tsx            # Sidebar component
│   ├── InboxChatList.tsx           # Chat list view
│   ├── InboxMessages.tsx           # Messages view
│   ├── InboxDetails.tsx            # Details panel
│   └── inbox.module.scss           # Inbox styles
├── public/
│   ├── hero.gif                    # Hero animation
│   └── icons/                      # Category icons
└── README.md
```

## 🎨 Customization

### Honeycomb Cells

Modify the `leftHoneycombCells` and `rightHoneycombCells` arrays in `honeycombbutton.tsx`:

```typescript
const customCells = [
  { 
    id: 1, 
    icon: <YourIcon />, 
    size: 50, 
    label: 'custom',
    link: '/custom-route'
  }
];
```

### Colors & Theme

Update gradient colors in `page.tsx`:

```typescript
background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
```

### Animation Timing

Adjust GSAP animation durations:

```typescript
gsap.to(element, {
  duration: 1.8,  // Customize duration
  ease: 'power3.out'  // Change easing function
});
```


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern glassmorphism design trends
- D3.js community for force-directed graph examples
- GSAP for animation framework




---

⭐ Star this repo if you find it helpful!
