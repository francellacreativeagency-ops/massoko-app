import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  id: string
  email: string
  firstName: string
  createdAt: string
  lastLoginAt: string
}

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string, firstName: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (data: Partial<AuthUser>) => void
}

// Simple hash function for password (in production, use bcrypt on a server)
const simpleHash = (str: string): string => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash.toString(36)
}

// Get users from localStorage
const getStoredUsers = (): Record<string, { password: string; user: AuthUser }> => {
  if (typeof window === 'undefined') return {}
  try {
    const users = localStorage.getItem('massoko-users')
    if (!users) return {}
    const parsed = JSON.parse(users)
    // Validate the structure
    if (typeof parsed !== 'object' || parsed === null) return {}
    return parsed
  } catch (e) {
    console.error('Error reading users from localStorage:', e)
    return {}
  }
}

// Save users to localStorage
const saveStoredUsers = (users: Record<string, { password: string; user: AuthUser }>) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('massoko-users', JSON.stringify(users))
  } catch (e) {
    console.error('Error saving users to localStorage:', e)
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      signup: async (email: string, password: string, firstName: string) => {
        set({ isLoading: true })

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))

        const users = getStoredUsers()
        const normalizedEmail = email.toLowerCase().trim()

        // Check if user already exists
        if (users[normalizedEmail]) {
          set({ isLoading: false })
          return { success: false, error: 'An account with this email already exists. Please log in.' }
        }

        // Validate password
        if (password.length < 6) {
          set({ isLoading: false })
          return { success: false, error: 'Password must be at least 6 characters.' }
        }

        // Create new user
        const newUser: AuthUser = {
          id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          email: normalizedEmail,
          firstName: firstName.trim(),
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        }

        // Save to "database"
        users[normalizedEmail] = {
          password: simpleHash(password),
          user: newUser,
        }
        saveStoredUsers(users)

        set({ user: newUser, isAuthenticated: true, isLoading: false })
        return { success: true }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true })

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))

        const users = getStoredUsers()
        const normalizedEmail = email.toLowerCase().trim()

        const stored = users[normalizedEmail]

        if (!stored) {
          set({ isLoading: false })
          return {
            success: false,
            error: 'No account found with this email. Note: Accounts are stored locally in your browser. If you signed up on a different device or browser, please sign up again.'
          }
        }

        if (stored.password !== simpleHash(password)) {
          set({ isLoading: false })
          return { success: false, error: 'Incorrect password. Please try again.' }
        }

        // Update last login
        stored.user.lastLoginAt = new Date().toISOString()
        saveStoredUsers(users)

        set({ user: stored.user, isAuthenticated: true, isLoading: false })
        return { success: true }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateProfile: (data: Partial<AuthUser>) => {
        const currentUser = get().user
        if (!currentUser) return

        const updatedUser = { ...currentUser, ...data }
        set({ user: updatedUser })

        // Update in "database"
        const users = getStoredUsers()
        if (users[currentUser.email]) {
          users[currentUser.email].user = updatedUser
          saveStoredUsers(users)
        }
      },
    }),
    {
      name: 'massoko-auth',
    }
  )
)
