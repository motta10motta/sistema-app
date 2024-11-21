import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Aquí deberías verificar las credenciales contra tu base de datos
        // Por ahora, usaremos un usuario hardcodeado
        if (credentials?.username === "admin" && credentials?.password === "password") {
          return { id: "1", name: "Admin" }
        } else {
          return null
        }
      }
    })
  ],
  // Añade esta configuración para el manejo de sesiones en el lado del servidor
  session: {
    strategy: "jwt",
  },
  // Añade una clave secreta (puedes generarla con `openssl rand -base64 32`)
  secret: process.env.NEXTAUTH_SECRET,
})

