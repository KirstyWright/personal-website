<script setup lang="ts">
import IconArrowUpRight from './icons/IconArrowUpRight.vue'
</script>

<template>
  <section
    id="snapmedic"
    class="border-t border-b border-[var(--color-rule)] py-16 md:py-24"
  >
    <div class="mx-auto w-full max-w-5xl px-6 grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16 items-center">
      <div>
        <div class="text-meta flex items-center gap-2 mb-2">
          <span
            class="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]"
            aria-hidden="true"
          />
          <span>Live on the App Store</span>
        </div>

        <h2 class="font-display text-[2.5rem] md:text-[3rem] leading-none mt-2">
          SnapMedic
        </h2>

        <p class="text-lead mt-5 max-w-[44ch]">
          A pocket toolkit for UK ambulance clinicians — clinical tools, ECG interpretation, OSCE practice, flashcards and welfare resources.
        </p>

        <div class="mt-5 space-y-3 text-[var(--color-ink-soft)] max-w-[52ch]">
          <p>
            Built from the tools I wished I had on shift. NEWS2, GCS, cardiac arrest logs, handover formats and drug search — all offline.
          </p>
          <p>
            Now over 10,000 downloads. Community-driven, privacy-first, free at the point of use, and growing into something that helps clinicians learn, not just look things up.
          </p>
        </div>

        <ul class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-meta">
          <li>
            <a
              href="https://snapmedic.app"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 no-underline text-[var(--color-ink)]"
              style="text-decoration: underline; text-decoration-color: var(--color-brand); text-underline-offset: 0.35em;"
            >
              <span>snapmedic.app</span>
              <IconArrowUpRight class="w-4 h-4" />
            </a>
          </li>
          <li>
            <a
              href="https://snapmedic.app/apps"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 no-underline text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
              style="text-decoration: none;"
            >
              <span>Get the app</span>
              <IconArrowUpRight class="w-4 h-4" />
            </a>
          </li>
        </ul>
      </div>

      <div class="relative md:justify-self-end">
        <div
          class="absolute -inset-2 rounded-[3rem] bg-[var(--color-rule)]/40 blur-2xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          class="phone relative mx-auto w-full max-w-[300px] md:max-w-[320px]"
          style="transform: rotate(2deg);"
        >
          <div class="phone__bezel">
            <span
              class="phone__island"
              aria-hidden="true"
            />
            <NuxtImg
              src="/images/snapmedic/onboarding.webp"
              alt="SnapMedic onboarding screen"
              class="phone__screen"
              width="780"
              height="1688"
              format="webp"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.phone {
  filter: drop-shadow(0 30px 40px rgba(17, 17, 17, 0.18)) drop-shadow(0 8px 12px rgba(17, 17, 17, 0.08));
}

.phone__bezel {
  position: relative;
  padding: 12px;
  border-radius: 2.75rem;
  background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
  box-shadow:
    inset 0 0 0 1.5px #2a2a2a,
    inset 0 0 0 3px #050505;
}

.phone__island {
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  width: 28%;
  height: 22px;
  border-radius: 999px;
  background: #050505;
  z-index: 2;
}

.phone__screen {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 2rem;
  background: #000;
}
</style>
