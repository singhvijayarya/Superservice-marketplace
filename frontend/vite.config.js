// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import path from 'path'

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     fs: {
//       allow: [
//         path.resolve(__dirname, "src"), 
//         path.resolve(__dirname, "../Super_Service/src/assets") // Allow external assets folder
//       ]
//     }
//   }
// })


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Manually define __dirname
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     fs: {
//       allow: [
//         path.resolve(__dirname, "src"),
//         path.resolve(__dirname, "../Super_Service/src/assets") // Adjust as needed
//       ]
//     }
//   }
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

// Manually define __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    fs: {
      allow: [
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "../Super_Service/src/assets"),
        path.resolve(__dirname, "node_modules") // ✅ ADD THIS LINE
      ]
    }
  }
});


