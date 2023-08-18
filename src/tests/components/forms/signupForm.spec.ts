import { mount, type VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import SignupForm from '@/components/molecules/Forms/Member/SignupForm.vue'
import router from '@/router'
import { createPinia } from 'pinia'

describe('SignupForm.vue', () => {
  let wrapper: VueWrapper | null = null

  beforeEach(() => {
    wrapper = mount(SignupForm, {
      global: {
        plugins: [createPinia(), router]
      }
    })
  })

  it('should check if signup form exist', async () => {
    const form = wrapper?.find('form')
    expect(form?.exists()).toBe(true)
  })

  it('should be able to enter text in field', async () => {
    const emailField = wrapper?.find('[data-test="email"')
    expect(emailField?.exists()).toBe(true)

    await emailField?.setValue('test@example.com')
    expect((emailField?.element as HTMLInputElement).value).toBe('test@example.com')
  })
})