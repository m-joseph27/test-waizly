import { mount } from '@vue/test-utils';
import TodoApp from '../src/components/TodoApps.vue';

describe('TodoApp', () => {
  test('adds a new todo when submitted', async () => {
    const wrapper = mount(TodoApp);
    const input = wrapper.find('input[type="text"]');
    await input.setValue('Test todo');
    const form = wrapper.find('form');
    await form.trigger('submit.prevent');
    expect(wrapper.vm.todos).toHaveLength(1);
    expect(wrapper.vm.todos[0].todo).toBe('Test todo');
  });
});
